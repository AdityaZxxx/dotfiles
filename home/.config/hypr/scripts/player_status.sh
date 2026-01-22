#!/bin/bash

# Chekk if playerctl is playing
if ! playerctl status &>/dev/null; then
    echo '{"text": "<span color=\"#282828\" bgcolor=\"#d8a657\">  </span><span color=\"#d8a657\"> No Media </span>", "class": "stopped", "tooltip": "No media playing"}'
    exit 0
fi

# Get info from playerctl
ARTIST=$(playerctl metadata artist 2>/dev/null)
TITLE=$(playerctl metadata title 2>/dev/null)
STATUS=$(playerctl status 2>/dev/null)

# Escape special characters for JSON
escape() {
    echo "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'
}

ARTIST_ESC=$(escape "$ARTIST")
TITLE_ESC=$(escape "$TITLE")
ALBUM_ESC=$(escape "$ALBUM")

# Tooltip full info
FULL_INFO="$ARTIST_ESC - $TITLE_ESC"
[ -n "$ALBUM_ESC" ] && FULL_INFO="$FULL_INFO | Album: $ALBUM_ESC"


# Cut title and artist if they are too long
MAX_LENGTH=20
if [ ${#TITLE} -gt $MAX_LENGTH ]; then
    TITLE="${TITLE:0:$MAX_LENGTH}..."
fi

if [ ${#ARTIST} -gt $MAX_LENGTH ]; then
    ARTIST="${ARTIST:0:$MAX_LENGTH}..."
fi

# Icon and status
ICON=""
if [[ $STATUS == "Playing" ]]; then
    ICON=" "
elif [[ $STATUS == "Paused" ]]; then
    ICON=" "
else
    ICON=" "
fi

# Output JSON for Waybar
echo "{\"text\": \"<span color='#282828' bgcolor='#d8a657'>$ICON </span> <span color='#d8a657'>$ARTIST - $TITLE</span>\", \"tooltip\": \"$FULL_INFO\", \"class\": \"$STATUS\"}"