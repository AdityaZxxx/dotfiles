#!/bin/bash

# Cek nama interface yang aktif
INTERFACE=$(ip route | awk '/default/ {print $5; exit}')

if [ -z "$INTERFACE" ]; then
    echo "{\"text\": \"❌ No Network\", \"tooltip\": \"No active network interface detected\"}"
    exit 1
fi

RX_PREV=$(cat /sys/class/net/$INTERFACE/statistics/rx_bytes)
TX_PREV=$(cat /sys/class/net/$INTERFACE/statistics/tx_bytes)
sleep 1
RX_NEXT=$(cat /sys/class/net/$INTERFACE/statistics/rx_bytes)
TX_NEXT=$(cat /sys/class/net/$INTERFACE/statistics/tx_bytes)

RX_SPEED=$(( ($RX_NEXT - $RX_PREV) / 1024 ))
TX_SPEED=$(( ($TX_NEXT - $TX_PREV) / 1024 ))

echo "{\"text\": \"󰛳 ${RX_SPEED}K/s  ${TX_SPEED}K/s\", \"tooltip\": \"Download: ${RX_SPEED} KB/s\\nUpload: ${TX_SPEED} KB/s\"}"

