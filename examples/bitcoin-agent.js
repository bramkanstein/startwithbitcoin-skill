/**
 * Complete Bitcoin Agent Class
 *
 * A reusable class that provides full Bitcoin capabilities:
 * - Lightning payments via NWC
 * - Nostr identity and messaging
 *
 * Prerequisites:
 * - NOSTR_SECRET_KEY in .env (generate with identity-setup.js)
 * - NWC_URL in .env (from Alby, LNbits, etc.)
 */

import { hexToBytes } from '@noble/hashes/utils';
import { getPublicKey, finalizeEvent, nip04 } from 'nostr-tools';
import { Relay } from 'nostr-tools/relay';
import { nip19 } from 'nostr-tools';
import { nwc } from '@getalby/sdk';

export class BitcoinAgent {
  /**
   * Create a new Bitcoin Agent
   * @param {Object} config
   * @param {string} config.secretKey - Hex-encoded Nostr secret key
   * @param {string} config.nwcUrl - NWC connection string
   * @param {string[]} [config.relays] - Nostr relay URLs
   */
  constructor(config) {
    if (!config.secretKey) throw new Error('secretKey is required');
    if (!config.nwcUrl) throw new Error('nwcUrl is required');

    this.secretKey = hexToBytes(config.secretKey);
    this.publicKey = getPublicKey(this.secretKey);
    this.npub = nip19.npubEncode(this.publicKey);

    this.wallet = new nwc.NWCClient({
      nostrWalletConnectUrl: config.nwcUrl,
    });

    this.relays = config.relays || [
      'wss://relay.damus.io',
      'wss://nos.lol',
      'wss://relay.nostr.band',
    ];
  }

  // ============ Wallet Methods ============

  /**
   * Get wallet balance in sats
   * @returns {Promise<number>}
   */
  async getBalance() {
    const { balance } = await this.wallet.getBalance();
    return balance;
  }

  /**
   * Create Lightning invoice to receive payment
   * @param {number} amount - Amount in sats
   * @param {string} description - Invoice description
   * @param {number} [expiry=3600] - Expiry in seconds
   * @returns {Promise<{invoice: string, payment_hash: string}>}
   */
  async createInvoice(amount, description, expiry = 3600) {
    const result = await this.wallet.makeInvoice({
      amount,
      description,
      expiry,
    });
    return {
      invoice: result.invoice,
      payment_hash: result.payment_hash,
    };
  }

  /**
   * Pay a Lightning invoice
   * @param {string} bolt11 - BOLT11 invoice string
   * @returns {Promise<{preimage: string, fees_paid: number}>}
   */
  async payInvoice(bolt11) {
    const result = await this.wallet.payInvoice({ invoice: bolt11 });
    return {
      preimage: result.preimage,
      fees_paid: result.fees_paid || 0,
    };
  }

  /**
   * List recent transactions
   * @param {number} [limit=10] - Max transactions to return
   * @returns {Promise<Array>}
   */
  async listTransactions(limit = 10) {
    const result = await this.wallet.listTransactions({ limit });
    return result.transactions;
  }

  // ============ Nostr Methods ============

  /**
   * Send encrypted DM to another user
   * @param {string} recipientPubkey - Recipient's hex pubkey
   * @param {string} message - Message content
   * @returns {Promise<string>} Event ID
   */
  async sendDM(recipientPubkey, message) {
    const encrypted = await nip04.encrypt(
      this.secretKey,
      recipientPubkey,
      message
    );

    const event = finalizeEvent({
      kind: 4,
      created_at: Math.floor(Date.now() / 1000),
      tags: [['p', recipientPubkey]],
      content: encrypted,
    }, this.secretKey);

    await this._publishEvent(event);
    return event.id;
  }

  /**
   * Post a public note
   * @param {string} content - Note content
   * @returns {Promise<string>} Event ID
   */
  async postNote(content) {
    const event = finalizeEvent({
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content,
    }, this.secretKey);

    await this._publishEvent(event);
    return event.id;
  }

  /**
   * Publish profile metadata
   * @param {Object} profile
   * @param {string} profile.name
   * @param {string} [profile.about]
   * @param {string} [profile.picture]
   * @param {string} [profile.lud16] - Lightning address
   * @returns {Promise<string>} Event ID
   */
  async updateProfile(profile) {
    const event = finalizeEvent({
      kind: 0,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: JSON.stringify(profile),
    }, this.secretKey);

    await this._publishEvent(event);
    return event.id;
  }

  /**
   * Internal: Publish event to relays
   * @private
   */
  async _publishEvent(event) {
    // Publish to first relay (for simplicity)
    // In production, publish to multiple relays
    const relay = await Relay.connect(this.relays[0]);
    await relay.publish(event);
    relay.close();
  }
}

// ============ Example Usage ============

async function main() {
  // Load from environment
  const agent = new BitcoinAgent({
    secretKey: process.env.NOSTR_SECRET_KEY,
    nwcUrl: process.env.NWC_URL,
  });

  console.log('Agent Public Key:', agent.npub);
  console.log('');

  // Check balance
  const balance = await agent.getBalance();
  console.log('Wallet Balance:', balance.toLocaleString(), 'sats');
  console.log('');

  // Create invoice
  const { invoice, payment_hash } = await agent.createInvoice(
    100,
    'Test from Bitcoin Agent'
  );
  console.log('Created invoice:', invoice.substring(0, 50) + '...');
  console.log('Payment hash:', payment_hash);
  console.log('');

  // Post announcement
  const noteId = await agent.postNote(
    'Bitcoin Agent online! Ready to transact. #bitcoin #nostr'
  );
  console.log('Posted note:', noteId);
}

// Run if executed directly
import 'dotenv/config';
if (process.env.NOSTR_SECRET_KEY && process.env.NWC_URL) {
  main().catch(console.error);
} else {
  console.log('Set NOSTR_SECRET_KEY and NWC_URL in .env to run example');
}
