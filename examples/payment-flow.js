/**
 * Complete Payment Flow Example
 *
 * Demonstrates:
 * - Creating invoices to receive payment
 * - Paying invoices to send payment
 * - Checking balance
 *
 * Prerequisites:
 * - NWC_URL set in .env
 *
 * Run: node payment-flow.js
 */

import { nwc } from '@getalby/sdk';
import 'dotenv/config';

async function main() {
  if (!process.env.NWC_URL) {
    console.error('Error: NWC_URL not set in environment');
    process.exit(1);
  }

  const client = new nwc.NWCClient({
    nostrWalletConnectUrl: process.env.NWC_URL,
  });

  console.log('='.repeat(50));
  console.log('  LIGHTNING PAYMENT FLOW');
  console.log('='.repeat(50));
  console.log('');

  // 1. Check initial balance
  console.log('1. Checking balance...');
  const initialBalance = await client.getBalance();
  console.log(`   Balance: ${initialBalance.balance.toLocaleString()} sats`);
  console.log('');

  // 2. Create an invoice
  console.log('2. Creating invoice for 100 sats...');
  const invoice = await client.makeInvoice({
    amount: 100,
    description: 'Test invoice from AI agent',
    expiry: 3600,
  });
  console.log('   Invoice created!');
  console.log(`   Payment hash: ${invoice.payment_hash}`);
  console.log('');
  console.log('   BOLT11 Invoice:');
  console.log(`   ${invoice.invoice}`);
  console.log('');

  // 3. Demonstrate paying an invoice (commented out to avoid spending)
  console.log('3. To pay an invoice:');
  console.log('');
  console.log('   const result = await client.payInvoice({');
  console.log('     invoice: "lnbc..."');
  console.log('   });');
  console.log('   console.log("Preimage:", result.preimage);');
  console.log('');

  // 4. Wait for payment example
  console.log('4. To wait for payment on your invoice:');
  console.log('');
  console.log('   // Poll for payment (simple approach)');
  console.log('   async function waitForPayment(paymentHash) {');
  console.log('     for (let i = 0; i < 60; i++) {');
  console.log('       const txs = await client.listTransactions({});');
  console.log('       const paid = txs.transactions.find(');
  console.log('         tx => tx.payment_hash === paymentHash');
  console.log('       );');
  console.log('       if (paid) return true;');
  console.log('       await new Promise(r => setTimeout(r, 1000));');
  console.log('     }');
  console.log('     return false;');
  console.log('   }');
  console.log('');

  console.log('='.repeat(50));
  console.log('');
  console.log('Pay the invoice above with any Lightning wallet to test receiving!');
  console.log('');
}

main().catch(console.error);
