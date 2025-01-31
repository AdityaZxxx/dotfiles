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
battery_icon_index=$( (battery_percentage / 10))

# Get the battery icon
battery_icon=${battery_icons[$battery_icon_index]}

# Check if the battery is charging
if [ "$battery_status" == "Charging" ]; then
    battery_icon=$charging_icon
fi

# Print the battery icon
echo "$battery_percentage% $battery_icon"