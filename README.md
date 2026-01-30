# Start With Bitcoin - Claude Code Skill

Enable AI agents to use Bitcoin via Lightning Network and Nostr. This skill gives Claude Code the knowledge to help you set up identity, wallet, and payment capabilities for AI agents.

## What This Skill Does

When installed, Claude Code will be able to:

- **Generate Nostr Identity** - Create keypairs (npub/nsec) for verifiable agent identity
- **Connect Lightning Wallets** - Set up NWC (Nostr Wallet Connect) for programmatic wallet access
- **Send & Receive Bitcoin** - Create invoices, pay invoices, check balance
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

**Payments:**
```
Show me how to create and pay Lightning invoices programmatically
```

**Direct Invocation:**
```
/startwithbitcoin full
```

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

### Lightning Network (Payments)
- Bitcoin Layer 2 for instant, near-zero-fee transactions
- Perfect for agent microtransactions
- BOLT11 invoice format

## Required Dependencies

The skill recommends these npm packages:

```bash
npm install nostr-tools @getalby/sdk @noble/hashes
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

The skill guides users to set up these environment variables:

```bash
# Nostr Identity (generate using identity-setup.js)
NOSTR_SECRET_KEY=<hex_secret_key>
NOSTR_PUBLIC_KEY=<hex_public_key>

# Wallet Connection (get from Alby, LNbits, or own node)
NWC_URL=nostr+walletconnect://...
```

## Wallet Options

The skill covers three wallet options:

### Alby (Easiest)
- Custodial, beginner-friendly
- Create account at getalby.com
- NWC available in Settings → Wallet Connections

### LNbits (Self-Hosted or Hosted)
- Open source Lightning wallet
- Use legend.lnbits.com or self-host
- Enable NWC extension for connection string

### Own Node (Advanced)
- Full sovereignty
- Umbrel, Start9, or Core Lightning
- Requires NWC plugin configuration

## Security Best Practices

The skill emphasizes:

1. **Never expose nsec/secret key** in code or logs
2. **Use environment variables** for all secrets
3. **Set spending limits** in NWC connections
4. **Use separate keys** for different agents
5. **Rotate NWC connections** periodically
6. **Monitor transactions** for unexpected activity

## Recommended Relays

For Nostr communication, the skill suggests:

- wss://relay.damus.io
- wss://nos.lol
- wss://relay.nostr.band
- wss://nostr.wine
- wss://relay.primal.net

## Resources

- **Website:** https://startwithbitcoin.com
- **Full Guides:** https://startwithbitcoin.com/guides
- **Website Repository:** https://github.com/bramkanstein/startwithbitcoin

## Related Projects

- [nostr-tools](https://github.com/nbd-wtf/nostr-tools) - Nostr protocol library
- [@getalby/sdk](https://github.com/getAlby/js-sdk) - Alby SDK with NWC support
- [LNbits](https://github.com/lnbits/lnbits) - Lightning wallet platform

## Contributing

Contributions are welcome! Please see the [website contribution guide](https://startwithbitcoin.com/contribute) for guidelines.

### Ways to Contribute
- Improve skill knowledge in `skills/startwithbitcoin/SKILL.md`
- Add example scripts
- Fix bugs or improve documentation
- Suggest new capabilities

## License

MIT
