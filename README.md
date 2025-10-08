# My Personal Dotfiles

Welcome to my dotfiles collection! This configuration is designed for a minimalist, modern, and efficient Linux desktop environment using Hyprland as the primary window manager.

![Desktop Preview](assets/fastfetch.png)

## Core Components

-   **Window Manager**: [Hyprland](https://hyprland.org/)
-   **Bar**: [Waybar](https://github.com/Alexays/Waybar)
-   **Application Launcher**: [Rofi](https://github.com/davatorium/rofi)
-   **Terminal**: [Kitty](https://sw.kovidgoyal.net/kitty/)
-   **Shell**: Zsh with [Starship](https://starship.rs/) prompt
-   **Theme**: Inspired by [Catppuccin Mocha](https://github.com/catppuccin/catppuccin).

## Installation

**Disclaimer:** These scripts and configurations are tailored for my personal use. Use them at your own risk. Always back up your existing dotfiles before proceeding.

1.  **Prerequisites:**
    Ensure all core components (Hyprland, Waybar, Rofi, Kitty, Zsh, Starship) and other dependencies (e.g., `nerd-fonts` for icons) are installed on your system via your preferred package manager.

2.  **Clone the Repository:**
    ```bash
    git clone https://github.com/AdityaZxxx/dotfiles.git ~/dotfiles
    ```
    *(Replace `username/dotfiles` with your repository URL)*

3.  **Create Symbolic Links:**
    Link the configuration files from this repository to your `~/.config` directory.

    ```bash
    # Example for linking Hyprland config
    ln -s ~/dotfiles/hypr ~/.config/hypr

    # Example for linking Rofi config
    ln -s ~/dotfiles/rofi ~/.config/rofi

    # Example for linking Waybar config
    ln -s ~/dotfiles/waybar ~/.config/waybar

    # Example for linking Kitty config
    ln -s ~/dotfiles/kitty ~/.config/kitty

    # Link the .zshrc file
    ln -s ~/dotfiles/.zshrc ~/.zshrc
    ```
    Do this for all the configurations you wish to use.

## Directory Structure

This repository's structure is organized by application for easy management:

-   `hypr/`: Configuration for Hyprland, including window rules, keybinds, and startup settings.
-   `waybar/`: Configuration for Waybar (CSS styles and modules).
-   `rofi/`: Themes and scripts for the Rofi launcher and powermenu.
-   `kitty/`: Kitty terminal configuration.
-   `zsh/`: Modular Zsh settings.
-   `assets/`: Images and other resources for the README.

## Credits

Much of the inspiration and some components come from the amazing open-source community. Thanks to all the developers whose work is featured here.
