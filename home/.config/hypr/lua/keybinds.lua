local mainMod = "SUPER"

hl.bind("XF86MonBrightnessUp", hl.dsp.exec_cmd("brightnessctl -q s +2%"))
hl.bind("XF86MonBrightnessDown", hl.dsp.exec_cmd("brightnessctl -q s 2%-"))
hl.bind("XF86AudioRaiseVolume", hl.dsp.exec_cmd("wpctl set-volume -l 1 @DEFAULT_AUDIO_SINK@ 2%+"))
hl.bind("XF86AudioLowerVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 2%-"))
hl.bind("XF86AudioMute", hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"))
hl.bind("XF86AudioMicMute", hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SOURCE@ toggle"))

hl.bind("SUPER + Prior", hl.dsp.exec_cmd("playerctl previous"))
hl.bind("SUPER + Next", hl.dsp.exec_cmd("playerctl next"))
hl.bind("SUPER + Up", hl.dsp.exec_cmd("playerctl play-pause"))

hl.bind("Print", hl.dsp.exec_cmd("grim - | wl-copy"))
hl.bind("SUPER + SHIFT + O", hl.dsp.exec_cmd("grim -g \"$(slurp)\" /tmp/ocr.png && tesseract -l eng /tmp/ocr.png - | wl-copy && rm /tmp/ocr.png"))
hl.bind("SUPER + Print", hl.dsp.exec_cmd('bash -c \'filename=~/Pictures/Screenshots/screenshot-$(date +%Y-%m-%d_%H-%M-%S).png; grim -g "$(slurp)" "$filename" && wl-copy < "$filename" && swappy -f "$filename" -o "$filename"\''))

hl.bind("SUPER + Q", hl.dsp.window.close())
hl.bind("SUPER + F", hl.dsp.window.fullscreen())
hl.bind("SUPER + Space", hl.dsp.window.float({ action = "toggle" }))

hl.bind("SUPER + H", hl.dsp.focus({ direction = "left" }))
hl.bind("SUPER + L", hl.dsp.focus({ direction = "right" }))
hl.bind("SUPER + K", hl.dsp.focus({ direction = "up" }))
hl.bind("SUPER + J", hl.dsp.focus({ direction = "down" }))

hl.bind("SUPER + mouse_down", hl.dsp.focus({ workspace = "e+1" }))
hl.bind("SUPER + mouse_up", hl.dsp.focus({ workspace = "e-1" }))

for i = 1, 10 do
	local key = i % 10
	hl.bind("SUPER + " .. key, hl.dsp.focus({ workspace = i }))
	hl.bind("SUPER + SHIFT + " .. key, hl.dsp.window.move({ workspace = i }))
end

hl.bind("SUPER + Return", hl.dsp.exec_cmd("kitty"))
hl.bind("SUPER + SHIFT + Return", hl.dsp.exec_cmd("kitty -e yazi"))
hl.bind("SUPER + E", hl.dsp.exec_cmd("thunar"))
hl.bind("SUPER + C", hl.dsp.exec_cmd("code"))
hl.bind("SUPER + Y", hl.dsp.exec_cmd("youtube-music"))
hl.bind("SUPER + O", hl.dsp.exec_cmd("obsidian"))
hl.bind("SUPER + G", hl.dsp.exec_cmd("github-desktop"))
hl.bind("SUPER + M", hl.dsp.exec_cmd("pavucontrol"))
hl.bind("SUPER + D", hl.dsp.exec_cmd("vesktop"))
hl.bind("SUPER + P", hl.dsp.exec_cmd("hyprpicker -a"))
hl.bind("SUPER + Alt_l + K", hl.dsp.exec_cmd("~/.config/hypr/scripts/keybinds.sh"))
hl.bind("SUPER + Tab", hl.dsp.exec_cmd("vicinae vicinae://toggle"))
hl.bind("SUPER + Slash", hl.dsp.exec_cmd("kitty -e btop"))
hl.bind("SUPER + Escape", hl.dsp.exec_cmd("loginctl lock-session"))
hl.bind("SUPER + SHIFT + Escape", hl.dsp.exec_cmd("~/.config/rofi/powermenu/type-2/powermenu.sh"))
hl.bind("SUPER + Control_L + R", hl.dsp.exec_cmd("pkill -SIGUSR1 waybar"))
hl.bind("SUPER + W", hl.dsp.exec_cmd("~/.config/rofi/wallpaper/wallpaper-selector.sh"))
hl.bind("SUPER + N", hl.dsp.exec_cmd("swaync-client -t"))
hl.bind("SUPER + SHIFT + B", hl.dsp.exec_cmd("hyprctl dispatch workspace 99 && playerctl pause && wpctl set-mute @DEFAULT_AUDIO_SINK@ 1"))

hl.bind("SUPER + mouse:272", hl.dsp.window.drag(), { mouse = true })
hl.bind("SUPER + mouse:273", hl.dsp.window.resize(), { mouse = true })
