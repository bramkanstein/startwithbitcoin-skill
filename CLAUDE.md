# Start With Bitcoin - Claude Code Skill

## Overview

Claude Code skill for setting up Bitcoin/Lightning capabilities for AI agents using Nostr and NWC.

**Installation:** Clone to `~/.claude/skills/startwithbitcoin-skill`

## Why Bitcoin (Not "Crypto")

- **Sound Money**: 21 million cap. No inflation.
- **Permissionless**: No KYC. No approvals. Any agent can participate.
- **Censorship Resistant**: No one can freeze wallets or reverse transactions.
- **15+ Years Secure**: Battle-tested. Never hacked.
- **Same Keys as Nostr**: secp256k1 cryptography for identity and money.

## Tools Available Today (All Free)

| Tool | Purpose | URL |
|------|---------|-----|
| Alby | Lightning wallet with NWC | https://getalby.com |
| Alby MCP Server | Connect wallet to Claude | https://github.com/getAlby/mcp |
| Public Relays | Free Nostr relays | relay.damus.io, nos.lol |
| NWC Faucet | Test wallets | https://faucet.nwc.dev |

## Structure

```
skills/
└── startwithbitcoin/
    └── SKILL.md          # Main skill file with all knowledge
examples/
├── identity-setup.js     # Generate Nostr keypair
├── wallet-connect.js     # Test NWC connection
├── payment-flow.js       # Invoice and payment demo
└── bitcoin-agent.js      # Complete agent class
.env.example              # Template for environment variables
```

## Key Concepts

- **Nostr**: Decentralized identity via keypairs (npub/nsec)
- **NWC**: Nostr Wallet Connect for Lightning wallet access
- **Lightning**: Layer 2 Bitcoin for instant payments
- **On-Chain**: Direct Bitcoin transactions for larger amounts

## Skill Capabilities

The skill teaches Claude Code how to:
1. **Generate Nostr Identity** - Create keypairs using nostr-tools
2. **Connect Lightning Wallets** - Set up NWC with Alby/LNbits/own node
3. **Send & Receive Bitcoin (Lightning)** - Instant, cheap payments
4. **Send & Receive Bitcoin (On-Chain)** - Larger transactions
5. **Communicate via Nostr** - Send DMs, post notes

## Trigger Phrases

The skill activates when user mentions:
- "Bitcoin for agents"
- "Lightning payments"
- "NWC" or "Nostr Wallet Connect"
- "agent wallet"
- "Nostr identity"
- "enable my AI to transact"

## Required Dependencies

```bash
# Core
npm install nostr-tools @getalby/sdk @noble/hashes

# On-chain (optional)
npm install bitcoinjs-lib ecpair tiny-secp256k1
```

## Environment Variables

```bash
NOSTR_SECRET_KEY=<hex_secret_key>
NOSTR_PUBLIC_KEY=<hex_public_key>
NWC_URL=nostr+walletconnect://...
```

## MCP Integration

For the easiest setup, use the Alby MCP Server:
- Repository: https://github.com/getAlby/mcp
- Provides payment tools directly in Claude
- No additional code needed

## Related

- Website: https://startwithbitcoin.com
- Website repo: https://github.com/bramkanstein/startwithbitcoin
- Skill repo: https://github.com/bramkanstein/startwithbitcoin-skill
- Alby MCP Server: https://github.com/getAlby/mcp
