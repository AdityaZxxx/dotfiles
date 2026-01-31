#!/usr/bin/env bash

# Path to the files
KEYBINDS_CONF="$HOME/.config/hypr/hyprland/keybinds/default.conf"
USER_PREF="$HOME/.config/hypr/hyprland/userPref.conf"
PARSER="$HOME/.config/hypr/scripts/keybinds_hint.py"

# Check if parser exists
if [[ ! -f "$PARSER" ]]; then
    notify-send "Error" "Keybinds parser script not found!"
    exit 1
fi

# Run parser and send to rofi
list=$(python3 "$PARSER" "$KEYBINDS_CONF" "$USER_PREF")
ROFI_THEME="$HOME/.config/rofi/keybinds.rasi"

echo "$list" | rofi -dmenu \
    -i \
    -p "󰌌 Keybinds" \
    -mesg "<b>Hint:</b> Type to search. Uses dual-column layout for better readability." \
    -config "$ROFI_THEME" \
    -markup-rows


