#!/bin/bash

PIDFILE="/tmp/coffee-mode.pid"

# Check if the script is run with the correct argument
if [[ "$1" == "toggle" ]]; then
    if [[ -f "$PIDFILE" ]]; then
        PID=$(cat "$PIDFILE")
        if kill -0 "$PID" 2>/dev/null; then
            kill "$PID"
            rm -f "$PIDFILE"
            exit
        fi
    fi
    # If the script is run without an argument, start the Coffee Mode
    systemd-inhibit --what=idle:sleep --why="Coffee Mode" sleep infinity &
    echo $! > "$PIDFILE"
    exit
fi

# Status check for Waybar
if [[ -f "$PIDFILE" ]]; then
    PID=$(cat "$PIDFILE")
    if kill -0 "$PID" 2>/dev/null; then
        # Coffee mode is active
        echo '{"text": " ON", "tooltip": "Click to deactivate Coffee Mode", "class": "on"}'
        exit
    else
        rm -f "$PIDFILE"
    fi
fi

# Coffee mode is off
echo '{"text": " OFF", "tooltip": "Click to activate Coffee Mode", "class": "off"}'
