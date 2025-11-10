###################################
# Aliases
###################################
# Universal
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias vv="nvim"
alias cc="clear"
alias xx="exit"
alias ls="eza --icons --group-directories-first"
alias la="ls -la"
alias lt="ls --tree"
alias zsource="source ~/.zshrc"

# Git
alias g="git status"
alias ga="git add"
alias gc="git commit -m"
alias gp="git push"
alias gl="git pull"
alias gb="git branch"
alias gco="git checkout"
alias gcl="git clone"
alias lg="lazygit"

# Directories
alias ds="cd ~/Desktop"
alias dl="cd ~/Downloads"
alias ws="cd ~/Workspaces"

# System
alias df="df -h"
alias du="du -h --max-depth=1"
alias free="free -m"
alias grep="rg --color=auto"
alias cat="bat"
alias ff="fastfetch"
alias fuckoff="shutdown now"

# Arch + Yay
alias up="yay -Syyu"
alias ins="yay -S"
alias search="yay -Ss"
alias rmpkg="yay -Rns"
alias clean="yay -Rns \$(pacman -Qdtq)"
alias list="yay -Q"
alias aur="yay -Qm"
alias own="yay -Qo"
alias upArchMirrors="rate-mirrors --allow-root --protocol https arch | sudo tee /etc/pacman.d/mirrorlist"

# Tmux
alias tnew="tmux new -s"
alias tls="tmux ls"
alias ta="tmux attach -t"

# AI tools
alias commit="~/go/bin/geminicommit"
alias gemma3="ollama run gemma3:270m"
alias gptoss="ollama run gpt-oss:latest"

# Decoration
alias matrix="unimatrix -c blue -u 'Aditya'"
