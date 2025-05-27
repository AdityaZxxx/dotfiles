#!/usr/bin/env bash

## Author : Aditya Shakya (adi1090x)
## Github : @adi1090x
#
## Rofi   : Power Menu
#
## Ini adalah versi yang dimodifikasi untuk Hyprland

# Current Theme
# Pastikan path ini benar dan tema Rofi Anda ada di sana
# Anda bisa mengganti 'type-4' dan 'style-1' sesuai preferensi Anda
dir="$HOME/.config/rofi/powermenu/type-4"
theme='style-1'

# CMDs
uptime="`uptime -p | sed -e 's/up //g'`"
host=`hostname`

# Options (Gunakan ikon Nerd Font atau ganti dengan teks jika tidak punya)
shutdown=''
reboot=''
lock=''
suspend=''
logout=''
yes='✔ Yes' # Mengganti ikon agar lebih umum
no='✘ No'  # Mengganti ikon agar lebih umum

# Rofi CMD
rofi_cmd() {
    rofi -dmenu \
        -p "Goodbye ${USER}" \
        -mesg "Uptime: $uptime" \
        -theme "${dir}/${theme}.rasi"
}

# Confirmation CMD
confirm_cmd() {
    rofi -dmenu \
        -p 'Confirmation' \
        -mesg 'Are you Sure?' \
        -theme "${dir}/shared/confirm.rasi" # Pastikan tema konfirmasi ini ada
}

# Ask for confirmation
confirm_exit() {
    echo -e "$yes\n$no" | confirm_cmd
}

# Pass variables to rofi dmenu
run_rofi() {
    # Urutan opsi bisa disesuaikan
    echo -e "$lock\n$suspend\n$logout\n$reboot\n$shutdown" | rofi_cmd
}

# Execute Command
run_cmd() {
    # Cek konfirmasi dulu hanya jika aksi bukan lock screen
    # Untuk lock screen, biasanya tidak perlu konfirmasi
    if [[ "$1" != '--lock' ]]; then
        selected_confirmation="$(confirm_exit)"
        if [[ "$selected_confirmation" != "$yes" ]]; then
            exit 0
        fi
    fi

    case "$1" in
        --shutdown)
            systemctl poweroff
            ;;
        --reboot)
            systemctl reboot
            ;;
        --suspend)
            # Opsional: pause media player atau mute audio sebelum suspend
            # mpc -q pause # Jika menggunakan MPD
            # amixer set Master mute # Jika menggunakan ALSA
            # pactl set-sink-mute @DEFAULT_SINK@ toggle # Jika menggunakan PulseAudio/PipeWire
            systemctl suspend
            ;;
        --logout)
            # Logika logout disesuaikan untuk Hyprland dan fallback lainnya
            # Menggunakan XDG_CURRENT_DESKTOP lebih disarankan daripada DESKTOP_SESSION
            current_desktop="${XDG_CURRENT_DESKTOP,,}"
            if [[ -z "$current_desktop" && -n "$DESKTOP_SESSION" ]]; then
                current_desktop="${DESKTOP_SESSION,,}"
            fi

            if [[ "$current_desktop" == "hyprland" ]]; then
                hyprctl dispatch exit ""
            elif [[ "$current_desktop" == "bspwm" ]]; then
                bspc quit
            elif [[ "$current_desktop" == "i3" ]]; then
                i3-msg exit
            elif [[ "$current_desktop" == "openbox" ]]; then
                openbox --exit
            elif [[ "$current_desktop" == "plasma" || "$current_desktop" == "kde" ]]; then
                qdbus org.kde.ksmserver /KSMServer logout 0 0 0
            else
                # Fallback umum jika session manager mendukungnya
                if command -v loginctl &> /dev/null && [[ -n "$XDG_SESSION_ID" ]]; then
                    loginctl terminate-session "$XDG_SESSION_ID"
                else
                    # Jika tidak ada cara spesifik, tampilkan pesan
                    rofi -e "Logout method not defined for $current_desktop"
                fi
            fi
            ;;
        --lock)
            # Logika untuk lock screen, utamakan hyprlock untuk Wayland/Hyprland
            if command -v hyprlock &> /dev/null; then
                hyprlock
            elif command -v betterlockscreen &> /dev/null; then
                betterlockscreen -l
            elif command -v i3lock &> /dev/null; then # i3lock mungkin memerlukan konfigurasi tambahan di Wayland
                i3lock
            else
                rofi -e "No lockscreen application found (hyprlock, betterlockscreen, i3lock)."
            fi
            ;;
        *)
            exit 0 # Aksi tidak diketahui
            ;;
    esac
}

# Actions
chosen="$(run_rofi)"
case "${chosen}" in
    "$shutdown")
        run_cmd --shutdown
        ;;
    "$reboot")
        run_cmd --reboot
        ;;
    "$lock")
        run_cmd --lock # Tidak perlu konfirmasi untuk lock
        ;;
    "$suspend")
        run_cmd --suspend
        ;;
    "$logout")
        run_cmd --logout
        ;;
esac