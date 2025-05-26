#!/bin/bash

# Cek apakah ada media yang diputar
if ! playerctl status &>/dev/null; then
    echo '{"text": "<span color=\"#282828\" bgcolor=\"#d8a657\">  </span><span color=\"#d8a657\"> No Media </span>", "class": "stopped", "tooltip": "No media playing"}'
    exit 0
fi

# Ambil informasi lagu/video
ARTIST=$(playerctl metadata artist 2>/dev/null)
TITLE=$(playerctl metadata title 2>/dev/null)
STATUS=$(playerctl status 2>/dev/null)

# Escape karakter bermasalah untuk JSON
escape() {
    echo "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'
}

ARTIST_ESC=$(escape "$ARTIST")
TITLE_ESC=$(escape "$TITLE")
ALBUM_ESC=$(escape "$ALBUM")

# Tooltip full info
FULL_INFO="$ARTIST_ESC - $TITLE_ESC"
[ -n "$ALBUM_ESC" ] && FULL_INFO="$FULL_INFO | Album: $ALBUM_ESC"


# Potong teks jika terlalu panjang
MAX_LENGTH=20
if [ ${#TITLE} -gt $MAX_LENGTH ]; then
    TITLE="${TITLE:0:$MAX_LENGTH}..."
fi

if [ ${#ARTIST} -gt $MAX_LENGTH ]; then
    ARTIST="${ARTIST:0:$MAX_LENGTH}..."
fi

# Ikon berdasarkan status
ICON=""
if [[ $STATUS == "Playing" ]]; then
    ICON=" "
elif [[ $STATUS == "Paused" ]]; then
    ICON=" "
else
    ICON=" "
fi

# Output JSON dengan style
echo "{\"text\": \"<span color='#282828' bgcolor='#d8a657'>$ICON </span> <span color='#d8a657'>$ARTIST - $TITLE</span>\", \"tooltip\": \"$FULL_INFO\", \"class\": \"$STATUS\"}"