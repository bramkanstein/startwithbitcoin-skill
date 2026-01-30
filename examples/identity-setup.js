/**
 * Generate Nostr Identity for an AI Agent
 *
 * Run: node identity-setup.js
 *
 * This script generates a new Nostr keypair for your agent.
 * Save the output securely - the secret key cannot be recovered!
 */

import { generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { bytesToHex } from '@noble/hashes/utils';
import { nip19 } from 'nostr-tools';

// Generate new keypair
const secretKey = generateSecretKey();
const publicKey = getPublicKey(secretKey);

// Convert to different formats
const secretKeyHex = bytesToHex(secretKey);
const nsec = nip19.nsecEncode(secretKey);
const npub = nip19.npubEncode(publicKey);

console.log('='.repeat(50));
console.log('  AI AGENT NOSTR IDENTITY');
console.log('='.repeat(50));
console.log('');
console.log('PUBLIC (share freely):');
console.log('  npub:', npub);
console.log('  hex: ', publicKey);
console.log('');
console.log('SECRET (keep safe, add to .env):');
console.log('  nsec:', nsec);
console.log('  hex: ', secretKeyHex);
console.log('');
console.log('='.repeat(50));
console.log('');
console.log('Add to your .env file:');
console.log('');
console.log(`NOSTR_SECRET_KEY=${secretKeyHex}`);
console.log(`NOSTR_PUBLIC_KEY=${publicKey}`);
console.log('');
console.log('='.repeat(50));
