/**
 * Connect to Lightning Wallet via NWC
 *
 * Prerequisites:
 * - NWC connection string from Alby, LNbits, or your own node
 * - Set NWC_URL in your .env file
 *
 * Run: node wallet-connect.js
 */

import { nwc } from '@getalby/sdk';
import 'dotenv/config';

async function main() {
  // Check for NWC URL
  if (!process.env.NWC_URL) {
    console.error('Error: NWC_URL not set in environment');
    console.log('');
    console.log('Get an NWC connection string from:');
    console.log('  - Alby: https://getalby.com (Settings → Wallet Connections)');
    console.log('  - LNbits: https://legend.lnbits.com (NWC extension)');
    console.log('');
    console.log('Then add to .env:');
    console.log('  NWC_URL=nostr+walletconnect://...');
    process.exit(1);
  }

  console.log('Connecting to wallet...');

  // Create NWC client
  const client = new nwc.NWCClient({
    nostrWalletConnectUrl: process.env.NWC_URL,
  });

  try {
    // Get wallet info
    const info = await client.getInfo();
    console.log('');
    console.log('Connected to:', info.alias || 'Unknown wallet');
    console.log('');

    // Get balance
    const balance = await client.getBalance();
    console.log('Balance:', balance.balance.toLocaleString(), 'sats');
    console.log('');

    // List recent transactions
    console.log('Recent transactions:');
    const txs = await client.listTransactions({ limit: 5 });

    if (txs.transactions.length === 0) {
      console.log('  No transactions yet');
    } else {
      for (const tx of txs.transactions) {
        const direction = tx.type === 'incoming' ? '↓' : '↑';
        const amount = tx.amount.toLocaleString().padStart(10);
        console.log(`  ${direction} ${amount} sats - ${tx.description || 'No description'}`);
      }
    }

    console.log('');
    console.log('Wallet connected successfully!');
  } catch (error) {
    console.error('Connection failed:', error.message);
    process.exit(1);
  }
}

main();
