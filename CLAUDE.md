# Start With Bitcoin - Claude Code Skill

## Overview

Claude Code skill for setting up Bitcoin/Lightning capabilities for AI agents using Nostr and NWC.

**Installation:** Clone to `~/.claude/skills/startwithbitcoin-skill`

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

## Skill Capabilities

The skill teaches Claude Code how to:
1. **Generate Nostr Identity** - Create keypairs using nostr-tools
2. **Connect Lightning Wallets** - Set up NWC with Alby/LNbits/own node
3. **Send & Receive Bitcoin** - Make/pay invoices, check balance
4. **Communicate via Nostr** - Send DMs, post notes

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
npm install nostr-tools @getalby/sdk @noble/hashes
```

## Environment Variables

```bash
NOSTR_SECRET_KEY=<hex_secret_key>
NOSTR_PUBLIC_KEY=<hex_public_key>
NWC_URL=nostr+walletconnect://...
```

## Related

- Website: https://startwithbitcoin.com
- Website repo: https://github.com/bramkanstein/startwithbitcoin
- Skill repo: https://github.com/bramkanstein/startwithbitcoin-skill
