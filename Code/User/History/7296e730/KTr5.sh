#!/bin/bash

# Get current battery percentage
battery_percentage=$(cat /sys/class/power_supply/BAT0/capacity)

# Get current battery status (charging, discharging, full)
battery_status=$(cat /sys/class/power_supply/BAT0/status)

# Define battery icons for each 10% segment
battery_icons=( "" "" "" "" "" "" "" "" "" "" )

#  Charging icon
charging_icon=""

# Calculate the battery icon index
battery_icon_index=$(( (battery_percentage / 10))