# Start With Bitcoin - Claude Code Skill

A Claude Code skill that helps AI agents set up Bitcoin and Lightning capabilities using Nostr and NWC.

## What This Does

This skill teaches Claude Code how to:
- Generate Nostr identity (keypairs) for agents
- Connect Lightning wallets via NWC (Nostr Wallet Connect)
- Send and receive Bitcoin payments
- Communicate via Nostr (DMs and public notes)

## Installation

Add to your Claude Code skills directory:

```bash
# Clone to your skills folder
git clone https://github.com/bramkanstein/startwithbitcoin-skill.git ~/.claude/skills/startwithbitcoin-skill
```

Or add the skill path to your Claude Code configuration.

## Usage

Once installed, Claude Code will automatically use this skill when you mention:
- "Bitcoin for agents"
- "Lightning payments"
- "NWC" or "Nostr Wallet Connect"
- "agent wallet"
- "Nostr identity"

### Example Prompts

```
Set up Bitcoin capabilities for my agent
```

```
Help me connect my agent to a Lightning wallet
```

```
/startwithbitcoin full
```

## Examples

The `examples/` directory contains runnable scripts:

- `identity-setup.js` - Generate Nostr keypair
- `wallet-connect.js` - Test NWC connection
- `payment-flow.js` - Create and pay invoices
- `bitcoin-agent.js` - Complete agent class

## Resources

- **Website:** https://startwithbitcoin.com
- **Guides:** https://startwithbitcoin.com/guides
- **Website Repo:** https://github.com/bramkanstein/startwithbitcoin

## License

MIT
