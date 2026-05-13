local suppressMaximizeRule = hl.window_rule({
    -- Ignore maximize requests from all apps. You'll probably like this.
    name  = "suppress-maximize-events",
    match = { class = ".*" },

    suppress_event = "maximize",
})

hl.window_rule({
    name  = "popup-stay-focused",
    match = {
        class    = "^$",
        xwayland = true,
        float    = true,
    },
    stay_focused = true,
})

hl.window_rule({
    name  = "popup-min-size",
    match = {
        class    = "^$",
        xwayland = true,
        float    = true,
    },
    min_size = "1 1",
})

hl.window_rule({
    name  = "popup-at-cursor",
    match = {
        class    = "^$",
        xwayland = true,
        float    = true,
    },
    move = "cursor_x cursor_y",
})