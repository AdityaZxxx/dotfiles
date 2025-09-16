###################################
# Completion
###################################
autoload -Uz compinit && compinit
setopt complete_aliases
setopt menu_complete
setopt auto_menu
zstyle ':completion:*' menu select
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
