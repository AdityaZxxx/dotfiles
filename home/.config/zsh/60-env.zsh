###################################
# Environment
###################################
# pnpm
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

# Turso
export PATH="$PATH:$HOME/.turso"

# TheFuck
if (( $+functions[zsh-defer] )); then
  # Use single quotes to prevent immediate expansion
  zsh-defer -c 'eval "$(thefuck --alias)"'
else
  eval "$(thefuck --alias)"
fi

# Gemini
export PATH="$HOME/.bun/bin:$PATH"

# Fzf
export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
export FZF_CTRL_T_OPTS="--preview 'bat --color=always {}'"
