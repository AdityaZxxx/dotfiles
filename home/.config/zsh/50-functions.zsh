###################################
# Functions
###################################
cdg() { cd "$1" && ls }
mkd() { mkdir -p "$1" && cd "$1"; }

extract() {
  case $1 in
    *.tar.bz2) tar xjf $1 ;;
    *.tar.gz)  tar xzf $1 ;;
    *.bz2)     bunzip2 $1 ;;
    *.rar)     unrar x $1 ;;
    *.gz)      gunzip $1 ;;
    *.tar)     tar xf $1 ;;
    *.tbz2)    tar xjf $1 ;;
    *.tgz)     tar xzf $1 ;;
    *.zip)     unzip $1 ;;
    *.7z)      7z x $1 ;;
    *)         echo "don't know how to extract '$1'..." ;;
  esac
}

# Create a new file and open it in nvim
new() { touch "$1" && nvim "$1"; }

# Find files with fzf 
fdcd() {
  local dir
  dir=$(fd --type d . | fzf --preview 'eza --tree --level=2 {}') && cd "$dir"
}

# Find files and edit with nvim
fedit() {
  local file
  file=$(fd . | fzf --preview 'bat --color=always {}') && nvim "$file"
}

# Docker clean-up 
dclean() {
  docker container prune -f
  docker image prune -f
}

# Get my IP + copy to clipboard
myip() { dig +short myip.opendns.com @resolver1.opendns.com | tee >(xclip -sel clip); }

# Convert video to gif
vid2gif() { ffmpeg -i "$1" -vf "fps=15,scale=640:-1:flags=lanczos" -c:v gif "${1%.*}.gif"; }