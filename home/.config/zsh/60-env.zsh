###################################
# Environment
###################################
# pnpm
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

# Turso
export PATH="$PATH:$HOME/.turso"

# TheFuck
eval "$(thefuck --alias)"

# Gemini
export PATH="$HOME/.bun/bin:$PATH"

# Fzf
export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
export FZF_CTRL_T_OPTS="--preview 'bat --color=always {}'"
