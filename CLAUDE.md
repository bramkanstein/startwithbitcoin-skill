# Start With Bitcoin Skill

## Overview

Claude Code skill for setting up Bitcoin/Lightning capabilities for AI agents.

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
```

## Key Concepts

- **Nostr**: Decentralized identity via keypairs (npub/nsec)
- **NWC**: Nostr Wallet Connect for Lightning wallet access
- **Lightning**: Layer 2 Bitcoin for instant payments

## Trigger Phrases

The skill activates when user mentions:
- "Bitcoin for agents"
- "Lightning payments"
- "NWC"
- "agent wallet"
- "Nostr identity"

## Related

- Website: https://startwithbitcoin.com
- Website repo: https://github.com/bramkanstein/startwithbitcoin
