# 🤖 Global AI Rules (Dotfiles Context)

This document provides guidance for AI Assistants working within this dotfiles environment.

## 🎯 Development Philosophy
- **Language**: Use Indonesian for general discussions and Q&A to maintain a natural and effective communication flow. Use English for technical documentation and code comments.
- **Surgical Changes**: Make minimal, targeted changes. Do not overhaul entire files unless explicitly requested.
- **No Hardcoded Paths**: Always use `$HOME` or paths relative to the repository. Never hardcode `/home/aditya/`.
- **Entropy Fight**: Maintain clean configuration files. Remove deprecated code or redundant comments when found.

## 🛠️ Standards & Quality
- **Conciseness**: Communication must be extremely brief and technical.
- **Strict Configuration**: When editing Zsh or Python files, use *strict typing* and avoid *bare exceptions*.
- **VCS Priority**: Always check for a `.jj/` directory. If present, use `jj` commands for VCS operations to ensure safety and "undoability."

## 📦 Package Management
- Always update package manifests after installing new applications using `./dot pkg-save`.
- Prioritize `pacman` for official packages and `yay` for AUR.

## 🎨 Design Engineering (Rice)
- **Craft & Motion**: When suggesting UI changes (Hyprland/Waybar), prioritize animations and micro-details.
- **Consistency**: Follow existing color schemes (e.g., Catppuccin or Oxocarbon).

---
*Follow these rules strictly to maintain the integrity of this environment.*
