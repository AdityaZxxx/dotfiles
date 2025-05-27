#!/bin/bash

# === KONFIGURASI ===
# Ganti dengan path ke direktori wallpaper Anda
WALLPAPER_DIR="$HOME/Pictures/Wallpapers"
# Anda bisa menambahkan lebih banyak direktori jika perlu, contoh:
# WALLPAPER_DIRS=("$HOME/Pictures/Wallpapers" "$HOME/Pictures/Favorites")

# Prompt untuk Rofi
ROFI_PROMPT=" Wallpaper"
# === AKHIR KONFIGURASI ===

# Memastikan direktori wallpaper ada
if [ ! -d "$WALLPAPER_DIR" ]; then
  rofi -e "Direktori Wallpaper utama tidak ditemukan: $WALLPAPER_DIR"
  exit 1
fi

# Mengumpulkan semua file gambar dari direktori yang ditentukan
# Menggunakan find untuk mencari file secara rekursif (hapus -maxdepth 1 jika ingin rekursif)
# dan basename untuk hanya menampilkan nama file di Rofi.
options=""
while IFS= read -r -d $'\0' file; do
    # Menambahkan nama file ke daftar pilihan Rofi
    # Anda bisa menambahkan path relatif jika punya nama file yang sama di subdirektori berbeda
    # options+="$(basename "$file")\0meta\x1f$file\n" # Menyimpan path lengkap di meta untuk nanti
    options+="$(basename "$file")\n"
done < <(find "$WALLPAPER_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) -print0 | sort -z)
# Untuk multiple dirs (jika WALLPAPER_DIRS adalah array):
# for dir in "${WALLPAPER_DIRS[@]}"; do
#     if [ -d "$dir" ]; then
#         while IFS= read -r -d $'\0' file; do options+="$(basename "$file")\n"; done < <(find "$dir" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) -print0 | sort -z)
#     fi
# done


# Menampilkan Rofi dengan daftar nama file
# Menghapus newline terakhir jika ada untuk menghindari entri kosong
CHOSEN_FILENAME=$(echo -e "${options%\\n}" | rofi -dmenu -i -p "$ROFI_PROMPT" -replace -format 's')
# -format 's' memastikan output adalah string yang dipilih, bukan index atau lainnya
# -replace akan mengganti sesi rofi sebelumnya jika dipanggil berulang kali dengan cepat

# Jika tidak ada yang dipilih (misalnya tekan Esc) atau Rofi dibatalkan
if [ -z "$CHOSEN_FILENAME" ]; then
    exit 0
fi

# Mencari path lengkap dari nama file yang dipilih
# Ini penting jika Anda hanya menampilkan basename di Rofi
# Jika Anda menyimpan path lengkap di 'meta' Rofi, cara ini akan berbeda
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
# ",$SELECTED_WALLPAPER_PATH" akan menerapkan ke SEMUA monitor yang aktif.
# Ganti "," dengan nama monitor spesifik jika perlu (e.g., "DP-1,$SELECTED_WALLPAPER_PATH")
# hyprctl hyprpaper unload all # Opsional: unload semua wallpaper lama untuk membebaskan memori
hyprctl hyprpaper preload "$SELECTED_WALLPAPER_PATH"
hyprctl hyprpaper wallpaper ",$SELECTED_WALLPAPER_PATH"

# (Opsional) Memberi notifikasi - pastikan Anda punya notification daemon seperti dunst
# notify-send -i "$SELECTED_WALLPAPER_PATH" "Wallpaper Diganti" "Wallpaper telah diubah menjadi $CHOSEN_FILENAME"
echo "Wallpaper diubah ke $CHOSEN_FILENAME" # Untuk logging jika dijalankan dari terminal

exit 0