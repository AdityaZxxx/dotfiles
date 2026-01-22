# 🌌 Dotfiles (Arch Linux + Agentic Edition)

A modern, efficient dotfiles management system designed specifically for human-AI collaboration. Uses a *Stow-based mirroring* pattern for seamless synchronization.

## 🚀 Key Features

- **Automatic Mirroring**: Uses GNU Stow to symlink the `home/` directory to `$HOME`.
- **Arch Native**: Integrated package manifests for `pacman` and `yay` (AUR).
- **Agent-Ready**: Includes `AGENTS.md` to provide high-quality engineering standards for AI assistants.
- **Dual VCS**: Powered by Git with Jujutsu (`jj`) for superior revision management (safe undo/redo).
- **Custom CLI**: A simple `dot` script to orchestrate the entire workflow.

## 📂 Repository Structure

```text
~/dotfiles/
├── home/           # Mirror of $HOME (stowed to ~)
│   └── .config/    # Configs for Hyprland, Kitty, Waybar, Nvim, etc.
├── packages/       # Installed package manifests (pacman & yay)
├── backups/        # Automatic backups during migration
├── dot             # CLI orchestrator
├── AGENTS.md       # AI Assistant instructions
└── README.md       # This documentation
```

## 🛠️ Using the `dot` CLI

Use the `./dot` script to manage your environment:

- **`./dot sync`**: Sync configurations from repo to system (automatically adopts new files).
- **`./dot pkg-save`**: Backup your Arch/AUR application list to the `packages/` folder.
- **`./dot doctor`**: Run system health diagnostics.

## 🤖 Agentic Workflow

This repository is optimized for AI agents and coding assistants:
1. **Context Awareness**: `AGENTS.md` guides the AI on *strict types* and *surgical changes*.
2. **Safety First**: With `jj`, every AI modification can be reversed with `jj undo` if errors occur.

## 📜 Installation on New Machines

1. Clone repo: `git clone <repo-url> ~/dotfiles`
2. Run sync: `~/dotfiles/dot sync`
3. Install packages (optional): `yay -S $(cat packages/yay.txt)`

---
*Created with ❤️ by an AI coding assistant.*
