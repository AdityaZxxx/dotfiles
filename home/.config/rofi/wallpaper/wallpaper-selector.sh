#!/bin/bash

# === KONFIGURASI ===
# Ganti dengan path ke direktori wallpaper Anda
WALLPAPER_DIR="$HOME/Pictures/Wallpapers"
# Anda bisa menambahkan lebih banyak direktori jika perlu, contoh:
# WALLPAPER_DIRS=("$HOME/Pictures/Wallpapers" "$HOME/Pictures/Favorites")

# Direktori untuk menyimpan thumbnail
THUMBNAIL_CACHE_DIR="$HOME/.cache/rofi_wallpaper_thumbnails"
# Ukuran thumbnail yang akan dibuat (dalam piksel, e.g., 96x96)
THUMBNAIL_SIZE="96"

# Prompt untuk Rofi
ROFI_PROMPT=" Wallpaper"

# Path ke file tema Rofi Anda
ROFI_THEME="$HOME/.config/rofi/wallpaper/theme.rasi" # Sesuaikan jika path berbeda
# === AKHIR KONFIGURASI ===

# Memastikan imagemagick (perintah convert) terinstal
if ! command -v convert &> /dev/null; then
  rofi -e "ImageMagick (perintah 'convert') tidak ditemukan. Mohon instal untuk menggunakan fitur thumbnail."
  exit 1
fi

# Memastikan direktori wallpaper ada
if [ ! -d "$WALLPAPER_DIR" ]; then
  rofi -e "Direktori Wallpaper utama tidak ditemukan: $WALLPAPER_DIR"
  exit 1
fi

# Membuat direktori cache thumbnail jika belum ada
mkdir -p "$THUMBNAIL_CACHE_DIR"

# Mengumpulkan semua file gambar dan membuat thumbnail jika perlu
options=""
# Menggunakan find untuk mencari file secara rekursif (hapus -maxdepth 1 jika ingin rekursif)
while IFS= read -r -d $'\0' file_path; do
    filename=$(basename "$file_path")
    # Menggunakan ekstensi .png untuk thumbnail demi konsistensi
    thumbnail_filename="${filename%.*}.png"
    thumbnail_path="$THUMBNAIL_CACHE_DIR/$thumbnail_filename"

    # Membuat thumbnail jika belum ada atau file aslinya lebih baru
    if [ ! -f "$thumbnail_path" ] || [ "$file_path" -nt "$thumbnail_path" ]; then
        convert "$file_path[0]" -thumbnail "${THUMBNAIL_SIZE}x${THUMBNAIL_SIZE}^" \
                -gravity center -extent "${THUMBNAIL_SIZE}x${THUMBNAIL_SIZE}" "$thumbnail_path" \
                >/dev/null 2>&1
        if [ $? -ne 0 ]; then
            echo "Gagal membuat thumbnail untuk $filename" >&2
            # Jika gagal, tidak menyertakan ikon untuk file ini
             options+="$filename\n"
             continue
        fi
    fi
    
    # Menambahkan nama file dan path thumbnail ke opsi Rofi
    # Format: "NamaTampilan\0icon\x1f/path/ke/ikon.png\n"
    if [ -f "$thumbnail_path" ]; then
        options+="$filename\0icon\x1f$thumbnail_path\n"
    else
        options+="$filename\n" # Fallback jika thumbnail tidak ada
    fi

done < <(find "$WALLPAPER_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) -print0 | sort -z)

# Untuk multiple dirs (jika WALLPAPER_DIRS adalah array):
# for dir in "${WALLPAPER_DIRS[@]}"; do
#     if [ -d "$dir" ]; then
#         while IFS= read -r -d $'\0' file_path; do
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


# Menampilkan Rofi dengan daftar nama file dan ikon
# Menghapus newline terakhir jika ada untuk menghindari entri kosong
CHOSEN_FILENAME=$(echo -e "${options%\\n}" | rofi -dmenu -i -p "$ROFI_PROMPT" -replace -format 's' -theme "$ROFI_THEME")

# Jika tidak ada yang dipilih (misalnya tekan Esc) atau Rofi dibatalkan
if [ -z "$CHOSEN_FILENAME" ]; then
    exit 0
fi

# Mencari path lengkap dari nama file yang dipilih
SELECTED_WALLPAPER_PATH=$(find "$WALLPAPER_DIR" -maxdepth 1 -type f -name "$CHOSEN_FILENAME" -print -quit)
# Untuk multiple dirs (jika WALLPAPER_DIRS adalah array):
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

# Memeriksa apakah file yang dipilih benar-benar ada (pengamanan tambahan)
if [ -z "$SELECTED_WALLPAPER_PATH" ] || [ ! -f "$SELECTED_WALLPAPER_PATH" ]; then
    rofi -e "File wallpaper '$CHOSEN_FILENAME' tidak dapat ditemukan di $WALLPAPER_DIR"
    exit 1
fi

# Menggunakan hyprctl untuk preload dan set wallpaper
# hyprctl hyprpaper unload all # Opsional
hyprctl hyprpaper preload "$SELECTED_WALLPAPER_PATH"
hyprctl hyprpaper wallpaper ",$SELECTED_WALLPAPER_PATH"

# (Opsional) Memberi notifikasi
# notify-send -i "$SELECTED_WALLPAPER_PATH" "Wallpaper Diganti" "Wallpaper telah diubah menjadi $CHOSEN_FILENAME"
echo "Wallpaper diubah ke $CHOSEN_FILENAME"

exit 0