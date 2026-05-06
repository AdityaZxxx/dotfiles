hl.config({
    misc = {
        font_family = "Geist",
        animate_manual_resizes = false,
        animate_mouse_windowdragging = false,
        enable_swallow = false,
        swallow_regex = "(foot|kitty|alacritty|ghostty)",
        focus_on_activate = true,
        disable_hyprland_logo = true,
        force_default_wallpaper = 0,
        allow_session_lock_restore = true,
        initial_workspace_tracking = true
    },
    xwayland = {
        force_zero_scaling = false
    },
    render = {
        direct_scanout = 2
    }
})