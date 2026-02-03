#!/bin/bash

# === CONFIGURATION ===
# Change to your wallpaper directory path
WALLPAPER_DIR="$HOME/Pictures/Wallpapers"
# You can add more directories if needed, example:
# WALLPAPER_DIRS=("$HOME/Pictures/Wallpapers" "$HOME/Pictures/Favorites")

# Hyprlock wallpaper path
HYPRLOCK_WALLPAPER_PATH="$HOME/.config/hypr/hyprlock/background.png"

# Directory for storing thumbnails
THUMBNAIL_CACHE_DIR="$HOME/.cache/rofi_wallpaper_thumbnails"
# Thumbnail size (width x height) - 16:9 ratio for desktop
THUMBNAIL_WIDTH="280"
THUMBNAIL_HEIGHT="157"

# Rofi prompt (hidden in theme)
ROFI_PROMPT=""

# Path to your Rofi theme file
ROFI_THEME="$HOME/.config/rofi/wallpaper/theme.rasi" # Adjust if path is different
# === END CONFIGURATION ===

# Ensure dependencies are installed
if ! command -v convert &> /dev/null; then
  rofi -e "ImageMagick (command 'convert') not found. Please install to use thumbnail feature."
  exit 1
fi
if ! command -v swww &> /dev/null;
then
  rofi -e "swww not found. Please install to continue."
  exit 1
fi

# Ensure wallpaper directory exists
if [ ! -d "$WALLPAPER_DIR" ];
then
  rofi -e "Main wallpaper directory not found: $WALLPAPER_DIR"
  exit 1
fi

# Create thumbnail cache directory if not exists
mkdir -p "$THUMBNAIL_CACHE_DIR"

# Collect all image files and create thumbnails if needed
options=""
# Using find to search files recursively (remove -maxdepth 1 for recursive)
while IFS= read -r -d $'\0' file_path;
do
    filename=$(basename "$file_path")
    # Using .png extension for thumbnails for consistency
    thumbnail_filename="${filename%.*}.png"
    thumbnail_path="$THUMBNAIL_CACHE_DIR/$thumbnail_filename"

    # Create thumbnail if not exists or original is newer
    if [ ! -f "$thumbnail_path" ] || [ "$file_path" -nt "$thumbnail_path" ];
    then
        convert "$file_path[0]" -resize "${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}!" \
                -quality 95 \
                -strip "$thumbnail_path" \
                >/dev/null 2>&1
        if [ $? -ne 0 ]; then
            echo "Failed to create thumbnail for $filename" >&2
            # If failed, don't include icon for this file
             options+="$filename\n"
             continue
        fi
    fi
    
    # Add filename and thumbnail path to Rofi options
    # Format: "DisplayName\0icon\x1f/path/to/icon.png\n"
    if [ -f "$thumbnail_path" ]; then
        options+="$filename\0icon\x1f$thumbnail_path\n"
    else
        options+="$filename\n" # Fallback if thumbnail not available
    fi

done < <(find "$WALLPAPER_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) -print0 | sort -z)

# For multiple dirs (if WALLPAPER_DIRS is an array):
# for dir in "${WALLPAPER_DIRS[@]}"; do
#     if [ -d "$dir" ]; then
#         while IFS= read -r -d $'\0' file_path;
#             do
#             filename=$(basename "$file_path")
#             thumbnail_filename="${filename%.*}.png"
#             thumbnail_path="$THUMBNAIL_CACHE_DIR/$thumbnail_filename"
#             if [ ! -f "$thumbnail_path" ] || [ "$file_path" -nt "$thumbnail_path" ]; then
#                 convert "$file_path[0]" -thumbnail "${THUMBNAIL_SIZE}x${THUMBNAIL_SIZE}^" \
#                         -gravity center -extent "${THUMBNAIL_SIZE}x${THUMBNAIL_SIZE}" "$thumbnail_path" \
#                         >/dev/null 2>&1
#             fi
#             if [ -f "$thumbnail_path" ]; then
#                 options+="$filename\0icon\x1f$thumbnail_path\n"
#             else
#                 options+="$filename\n"
#             fi
#         done < <(find "$dir" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) -print0 | sort -z)
#     fi
# done


# Display Rofi with file list and icons
# Remove trailing newline to avoid empty entry
CHOSEN_FILENAME=$(echo -e "${options%
}" | rofi -dmenu -i -p "$ROFI_PROMPT" -replace -format 's' -theme "$ROFI_THEME")

# If nothing selected (e.g., pressed Esc) or Rofi cancelled
if [ -z "$CHOSEN_FILENAME" ]; then
    exit 0
fi

# Find full path of selected filename
SELECTED_WALLPAPER_PATH=$(find "$WALLPAPER_DIR" -maxdepth 1 -type f -name "$CHOSEN_FILENAME" -print -quit)
# For multiple dirs (if WALLPAPER_DIRS is an array):
# SELECTED_WALLPAPER_PATH=""
# for dir in "${WALLPAPER_DIRS[@]}"; do
#     if [ -d "$dir" ]; then
#         FOUND_PATH=$(find "$dir" -maxdepth 1 -type f -name "$CHOSEN_FILENAME" -print -quit)
#         if [ -n "$FOUND_PATH" ]; then
#             SELECTED_WALLPAPER_PATH="$FOUND_PATH"
#             break
#         fi
#     fi
# done

# Check if selected file actually exists (extra safety check)
if [ -z "$SELECTED_WALLPAPER_PATH" ] || [ ! -f "$SELECTED_WALLPAPER_PATH" ]; then
    rofi -e "Wallpaper file '$CHOSEN_FILENAME' cannot be found in $WALLPAPER_DIR"
    exit 1
fi

# Set wallpaper using swww
# Initialize daemon if not running (safe to run multiple times)
swww init >/dev/null 2>&1

# Set wallpaper with transition (adjust to your preference)
swww img "$SELECTED_WALLPAPER_PATH" \
    --transition-type "any" \
    --transition-fps 60 \
    --transition-duration 0.7

# Copy to hyprlock (force overwrite to ensure update)
if cp -f "$SELECTED_WALLPAPER_PATH" "$HYPRLOCK_WALLPAPER_PATH"; then
    echo "Lockscreen wallpaper synced successfully"
else
    echo "Warning: Failed to copy wallpaper to hyprlock" >&2
fi

# (Optional) Send notification
# notify-send -i "$SELECTED_WALLPAPER_PATH" "Wallpaper Changed" "Wallpaper has been changed to $CHOSEN_FILENAME"
echo "Wallpaper changed to $CHOSEN_FILENAME"

exit 0
