###################################
#          Zmodload
###################################
zmodload zsh/parameter
zmodload zsh/datetime
zmodload zsh/mathfunc
zmodload zsh/zpty  # Untuk job control yang lebih baik

###################################
#          History
###################################
HISTSIZE=10000
SAVEHIST=10000
HISTFILE="$HOME/.zsh_history"

setopt hist_expire_dups_first    # Hapus duplikat lama dulu
setopt hist_reduce_blanks        # Hilangkan spasi berlebih
setopt hist_save_no_dups         # Jangan simpan entri duplikat
setopt share_history             # History dishare antar sesi

###################################
#     Autocompletion Settings
###################################
setopt complete_aliases
setopt list_packed
setopt menu_complete

zstyle ':completion:*' menu select
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}

###################################
#            Prompt
###################################
export STARSHIP_SHELL="zsh"
STARSHIP_SESSION_KEY="${RANDOM}${RANDOM}${RANDOM}${RANDOM}${RANDOM}0000000000000000"
export STARSHIP_SESSION_KEY=${STARSHIP_SESSION_KEY:0:16}
VIRTUAL_ENV_DISABLE_PROMPT=1

setopt promptsubst
PROMPT='$("/usr/bin/starship" prompt --terminal-width="$COLUMNS" --keymap="${KEYMAP:-}" --status="$STARSHIP_CMD_STATUS" --pipestatus="${STARSHIP_PIPE_STATUS[*]}" --cmd-duration="${STARSHIP_DURATION:-}" --jobs="$STARSHIP_JOBS_COUNT")'
RPROMPT='$("/usr/bin/starship" prompt --right --terminal-width="$COLUMNS" --keymap="${KEYMAP:-}" --status="$STARSHIP_CMD_STATUS" --pipestatus="${STARSHIP_PIPE_STATUS[*]}" --cmd-duration="${STARSHIP_DURATION:-}" --jobs="$STARSHIP_JOBS_COUNT")'
PROMPT2='$("/usr/bin/starship" prompt --continuation)'
eval "$(starship init zsh)"

###################################
#         Syntax Highlighting
###################################
source "/usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh"
source "/usr/share/zsh/plugins/fast-syntax-highlighting/fast-syntax-highlighting.plugin.zsh"

# Autosuggestions config
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=5"
ZSH_AUTOSUGGEST_STRATEGY=(history)

###################################
#            Keybind
###################################
bindkey '^R' history-incremental-search-backward  # Ctrl+R untuk search history

###################################
#            Aliases
###################################

## Universal Navigation & Utils
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias vv="nvim"
alias cc="clear"
alias xx="exit"
alias zsource="source .zshrc"
alias h="history"
alias j="jobs -l"
alias df="df -h"
alias du="du -h --max-depth=1"
alias free="free -m"
alias grep="grep --color=auto"
alias ip="ip addr show"
alias tree="tree -C"
alias less="less -r"
alias ff="fastfetch"
alias matrix="unimatrix -c blue -u 'Linux'"

## Git
alias g="git status"
alias ga="git add"
alias gc="git commit -m"
alias gp="git push"
alias gl="git pull"
alias co="checkout"
alias br="branch"
alias gcl="git clone"
alias lg="lazygit"
alias gg="fg"

## Custom Directory Shortcuts
alias ds="cd ~/Desktop"
alias dl="cd ~/Downloads"
alias dt="cd ~/Desktop"
alias ws="cd ~/Workspaces"
alias neodir="cd ~/.config/nvim"

## Config Editing
alias alconfig="nvim ~/.config/alacritty/alacritty.toml"

## Tooling / Apps
alias geminicom="~/go/bin/geminicommit"

## eza (ls replacement)
alias ls="eza --icons"
alias la="ls -la"
alias lsTree="ls --tree"

## Arch Linux / Yay
alias up="yay -Syyu"
alias ref="yay -Syy"
alias search="yay -Ss"
alias ins="yay -S"
alias rm="yay -Rns"
alias clean="yay -Rns $(pacman -Qdtq)"
alias pacs="yay -Q | wc -l"
alias list="yay -Q"
alias aur_list="yay -Qm"
alias upArchMirrors="rate-mirrors --allow-root --protocol https arch | sudo tee /etc/pacman.d/mirrorlist"

## Tmux
alias tnew="tmux new -s"
alias tls="tmux ls"
alias trename="tmux rename-session -t"
alias ta="tmux a -t"

###################################
#            Functions
###################################

cdg() { # Pindah directory + list isi
  cd "$1" && ls -F --color=auto
}

mkd() { # Buat folder + langsung masuk
  mkdir -p "$1" && cd "$1"
}
