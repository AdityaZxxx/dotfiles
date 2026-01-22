#!/usr/bin/env bash

while true; do
  capacity=$(cat /sys/class/power_supply/BAT0/capacity)
  status=$(cat /sys/class/power_supply/BAT0/status)

  if [[ $capacity -le 20 && $status != "Charging" ]]; then
    notify-send -a battery -u critical "Battery Low" "⚠️ ${capacity}% left!"
  fi

  sleep 60
done
