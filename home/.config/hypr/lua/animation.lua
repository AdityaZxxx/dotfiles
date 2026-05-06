hl.config({
    animations = {
        enabled = true
    }
})

hl.curve("linear", { type = "bezier", points = { {0, 0}, {1, 1} } })
hl.curve("easeOutExpo", { type = "bezier", points = { {0.16, 1}, {0.3, 1} } })
hl.curve("easeOutQuint", { type = "bezier", points = { {0.23, 1}, {0.32, 1} } })
hl.curve("md3_decel", { type = "bezier", points = { {0.05, 0.7}, {0.1, 1} } })

hl.animation({ leaf = "windows", enabled = true, speed = 2, bezier = "easeOutExpo", style = "popin 85%" })
hl.animation({ leaf = "border", enabled = true, speed = 1.5, bezier = "default" })
hl.animation({ leaf = "fade", enabled = true, speed = 1.8, bezier = "default" })
hl.animation({ leaf = "workspaces", enabled = true, speed = 2.2, bezier = "easeOutExpo", style = "slide" })
hl.animation({ leaf = "specialWorkspace", enabled = true, speed = 2, bezier = "easeOutExpo", style = "slidevert" })
hl.animation({ leaf = "layers", enabled = true, speed = 2, bezier = "easeOutExpo", style = "fade" })
hl.animation({ leaf = "global", enabled = true, speed = 3, bezier = "default" })