# Start With Bitcoin - Claude Code Skill

Enable AI agents to use Bitcoin via Lightning Network and Nostr. This skill gives Claude Code the knowledge to help you set up identity, wallet, and payment capabilities for AI agents.

## Why Bitcoin (Not "Crypto")

AI agents need money that's programmable, permissionless, and sound. Bitcoin is the only option.

| Reason | Description |
|--------|-------------|
| **Sound Money** | 21 million cap. No inflation. No one can print more. Your agent's earnings hold value. |
| **Permissionless** | No KYC. No approvals. No bank accounts. Any agent can participate instantly. |
| **Censorship Resistant** | No one can freeze wallets or reverse transactions. True ownership. |
| **15+ Years Secure** | Battle-tested since 2009. Never hacked. $1T+ secured. |
| **Same Keys as Nostr** | secp256k1 cryptography. One identity for money and communication. |

**Why not other "crypto"?**
- No pre-mines or VCs — Bitcoin had no ICO, no insider allocation. Fair launch.
- True decentralization — No foundation controlling upgrades.
- Same cryptographic curve as Nostr — Your identity keys work for payments too.

## Tools Available Today (All Free)

Everything you need exists and is free right now:

| Tool | Purpose | URL |
|------|---------|-----|
| **Alby** | Lightning wallet with NWC | https://getalby.com |
| **Alby MCP Server** | Connect wallet to Claude | https://github.com/getAlby/mcp |
| **Lightning Enable MCP** | MCP for Python/.NET | https://github.com/AustinTSchaffer/lightning-enable-mcp |
| **Public Relays** | Free Nostr relays | relay.damus.io, nos.lol |
| **NWC Faucet** | Test wallets | https://faucet.nwc.dev |
| **Alby Sandbox** | Explore payments | https://sandbox.albylabs.com |

Know a tool that should be listed? [Suggest it on GitHub](https://github.com/bramkanstein/startwithbitcoin/issues/new?title=Tool%20Suggestion)

## What This Skill Does

When installed, Claude Code will be able to:

- **Generate Nostr Identity** - Create keypairs (npub/nsec) for verifiable agent identity
- **Connect Lightning Wallets** - Set up NWC (Nostr Wallet Connect) for programmatic wallet access
- **Send & Receive Bitcoin (Lightning)** - Create invoices, pay invoices, check balance - instant, near-zero fees
- **Send & Receive Bitcoin (On-Chain)** - Direct Bitcoin transactions for larger amounts
- **Communicate via Nostr** - Send encrypted DMs, post public notes, subscribe to events

## Installation

### Option 1: Clone to Skills Directory

```bash
git clone https://github.com/bramkanstein/startwithbitcoin-skill.git ~/.claude/skills/startwithbitcoin-skill
```

### Option 2: Add Path to Configuration

Add the skill path to your Claude Code configuration file.

## Usage

Once installed, Claude Code automatically activates this skill when you mention:

- "Bitcoin for agents"
- "Lightning payments"
- "NWC" or "Nostr Wallet Connect"
- "agent wallet"
- "Nostr identity"
- "enable my AI to transact"

### Example Prompts

**Full Setup:**
```
Help me set up Bitcoin capabilities for my AI agent
```

**Identity Only:**
```
Generate a Nostr identity for my agent
```

**Wallet Connection:**
```
Connect my agent to a Lightning wallet via NWC
```

**Lightning Payments:**
```
Show me how to create and pay Lightning invoices programmatically
```

**On-Chain Bitcoin:**
```
Help me generate a Bitcoin address from my Nostr keys
```

**Direct Invocation:**
```
/startwithbitcoin full
```

## MCP Integration (Easiest Option)

For Claude and other MCP-compatible AI agents, use the **Alby MCP Server**:

- **Repository:** https://github.com/getAlby/mcp
- Provides payment tools directly in Claude
- No additional code needed beyond NWC connection
- Just configure and start transacting

This is the fastest way to give your AI agent Bitcoin capabilities.

## Technology Stack

This skill teaches the following technologies:

### Nostr (Identity)
- Decentralized identity using public-key cryptography
- **nsec**: Private key for signing (keep secret)
- **npub**: Public identifier (share freely)
- Uses secp256k1 curve (same as Bitcoin)

### NWC - Nostr Wallet Connect (Wallet Access)
- Protocol for remote Lightning wallet control
- Connection string format: `nostr+walletconnect://<pubkey>?relay=<url>&secret=<secret>`
- Supports: make_invoice, pay_invoice, get_balance, list_transactions

### Lightning Network (Fast Payments)
- Bitcoin Layer 2 for instant, near-zero-fee transactions
- Perfect for agent microtransactions
- BOLT11 invoice format

### On-Chain Bitcoin (Large Transactions)
- Direct Bitcoin transactions on the main blockchain
- Use for amounts >$1000 or cold storage
- Same secp256k1 keys work for both Nostr and Bitcoin

## Required Dependencies

```bash
# Core (identity + Lightning)
npm install nostr-tools @getalby/sdk @noble/hashes

# On-chain Bitcoin (optional)
npm install bitcoinjs-lib ecpair tiny-secp256k1
```

## Quick Start Code

```javascript
import { nwc } from '@getalby/sdk';

const client = new nwc.NWCClient({
  nostrWalletConnectUrl: process.env.NWC_URL,
});

// Check balance
const { balance } = await client.getBalance();
console.log('Balance:', balance, 'sats');

// Create invoice to receive
const invoice = await client.makeInvoice({
  amount: 1000,
  description: 'Payment for AI service',
});

// Pay invoice
await client.payInvoice({ invoice: 'lnbc...' });
```

## Example Scripts

The `examples/` directory contains runnable scripts demonstrating each capability:

| File | Description |
|------|-------------|
| `identity-setup.js` | Generate Nostr keypair and output formats |
| `wallet-connect.js` | Test NWC connection and check balance |
| `payment-flow.js` | Create invoice, pay invoice, list transactions |
| `bitcoin-agent.js` | Complete BitcoinAgent class with all methods |

### Running Examples

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your keys and NWC URL

# Run examples
node examples/identity-setup.js
node examples/wallet-connect.js
node examples/payment-flow.js
```

## Environment Variables

```bash
# Nostr Identity (generate using identity-setup.js)
NOSTR_SECRET_KEY=<hex_secret_key>
NOSTR_PUBLIC_KEY=<hex_public_key>

# Wallet Connection (get from Alby)
NWC_URL=nostr+walletconnect://...
```

## Wallet Options

### Alby (Recommended - Easiest)
- Free account at getalby.com
- NWC available in Settings → Wallet Connections
- Set permissions and daily budget
- Copy NWC connection string

### LNbits (Self-Hosted or Hosted)
- Open source Lightning wallet
- Use legend.lnbits.com or self-host
- Enable NWC extension for connection string

### Own Node (Advanced)
- Full sovereignty
- Umbrel, Start9, or Core Lightning
- Requires NWC plugin configuration

## Security Best Practices

1. **Never expose nsec/secret key** in code or logs
2. **Use environment variables** for all secrets
3. **Set spending limits** in NWC connections
4. **Use separate keys** for different agents
5. **Rotate NWC connections** periodically
6. **Monitor transactions** for unexpected activity

## Recommended Relays

For Nostr communication:

- wss://relay.damus.io
- wss://nos.lol
- wss://relay.nostr.band
- wss://nostr.wine
- wss://relay.primal.net

## Resources

- **Website:** https://startwithbitcoin.com
- **Full Guides:** https://startwithbitcoin.com/guides
- **On-Chain Guide:** https://startwithbitcoin.com/guides/onchain
- **Website Repository:** https://github.com/bramkanstein/startwithbitcoin
- **Alby MCP Server:** https://github.com/getAlby/mcp
- **Awesome NWC:** https://github.com/getAlby/awesome-nwc

## Related Projects

- [Alby MCP Server](https://github.com/getAlby/mcp) - Connect wallet to Claude (JavaScript)
- [Lightning Enable MCP](https://github.com/AustinTSchaffer/lightning-enable-mcp) - MCP for Python/.NET
- [nostr-tools](https://github.com/nbd-wtf/nostr-tools) - Nostr protocol library
- [@getalby/sdk](https://github.com/getAlby/js-sdk) - Alby SDK with NWC support
- [Awesome NWC](https://github.com/getAlby/awesome-nwc) - NWC resources

## Contributing

Contributions are welcome! Please see the [website contribution guide](https://startwithbitcoin.com/contribute) for guidelines.

### Ways to Contribute
- Improve skill knowledge in `skills/startwithbitcoin/SKILL.md`
- Add example scripts
- Fix bugs or improve documentation
- Suggest new capabilities

## License

MIT
