import re
import os
import sys

def clean_description(dispatcher, args, inline_comment):
    # 1. Priority: Inline comment
    if inline_comment:
        return inline_comment.strip()
    
    # 2. Dispatcher mapping for readability
    dispatcher_map = {
        "killactive": "Close Window",
        "fullscreen": "Toggle Fullscreen",
        "togglefloating": "Toggle Floating",
        "togglespecialworkspace": "Toggle Special Workspace",
        "movetoworkspacesilent": "Move to Workspace (Silent)",
        "movetoworkspace": "Move to Workspace",
        "workspace": "Switch to Workspace",
        "movefocus": "Move Focus",
        "movewindow": "Move Window",
        "resizeactive": "Resize Window",
        "cyclenext": "Next Window",
        "bringactivetotop": "Bring to Top",
        "hyprpicker": "Color Picker",
        "exec": "" # Will be handled by args
    }
    
    clean_disp = dispatcher_map.get(dispatcher, dispatcher)
    
    # 3. Handle 'exec' specifically to show the command
    if dispatcher == "exec":
        # Remove common prefixes like 'bash -c', 'kitty -e' etc if needed, 
        # but usually showing the command is better
        return args.strip()
    
    # 4. Combine dispatcher and args if args exist
    if args and clean_disp != dispatcher:
        return f"{clean_disp} ({args.strip()})"
    elif args:
        return f"{dispatcher} {args.strip()}"
    
    return clean_disp

import html

def parse_keybinds(file_paths):
    keybinds = []
    current_category = "General"
    variables = {}
    
    for file_path in file_paths:
        if not os.path.exists(file_path):
            continue
            
        with open(file_path, 'r') as f:
            for line in f:
                # Extract inline comment first
                inline_comment = ""
                if '#' in line and not line.strip().startswith('#'):
                    line, inline_comment = line.split('#', 1)
                
                line = line.strip()
                if not line:
                    continue
                
                # Detect Category
                if line.startswith("#!"):
                    current_category = line.replace("#!", "").strip("- ")
                    continue
                
                # Detect Variables
                var_match = re.match(r'^\$(\w+)\s*=\s*(.*)', line)
                if var_match:
                    variables[var_match.group(1)] = var_match.group(2)
                    continue
                
                # Detect Binds
                try:
                    bind_match = re.match(r'^(bind[edlmnri]*)\s*=\s*([^,]+),\s*([^,]+),\s*([^,]+)(?:,\s*(.*))?', line)
                    if bind_match:
                        mod = bind_match.group(2).strip()
                        key = bind_match.group(3).strip()
                        dispatcher = bind_match.group(4).strip()
                        args = bind_match.group(5).strip() if bind_match.group(5) else ""
                        
                        # Replace variables
                        for var_name, var_val in variables.items():
                            mod = mod.replace(f"${var_name}", var_val)
                            key = key.replace(f"${var_name}", var_val)
                        
                        description = clean_description(dispatcher, args, inline_comment)
                        
                        # Format key combo
                        key_combo = f"{mod} + {key}" if mod and mod != "," else key
                        key_combo = key_combo.replace(" ,", "").strip()
                        
                        # Escape for Pango Markup
                        cat_escaped = html.escape(current_category)
                        key_escaped = html.escape(key_combo)
                        desc_escaped = html.escape(description)
                        
                        keybinds.append(f"[{cat_escaped}] {key_escaped}  ->  {desc_escaped}")
                except Exception:
                    continue
                    
    return keybinds


if __name__ == "__main__":
    paths = [os.path.expanduser(p) for p in sys.argv[1:]]
    if not paths:
        paths = [
            "~/.config/hypr/hyprland/keybinds/default.conf",
            "~/.config/hypr/hyprland/userPref.conf"
        ]
        paths = [os.path.expanduser(p) for p in paths]
        
    results = parse_keybinds(paths)
    for r in results:
        print(r)
