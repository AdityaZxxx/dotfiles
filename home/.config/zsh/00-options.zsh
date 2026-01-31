###################################
# Zsh Core Options
###################################
zmodload zsh/parameter
zmodload zsh/datetime
zmodload zsh/mathfunc

# Load zsh-defer if available
if [[ -f "$HOME/zsh-defer/zsh-defer.plugin.zsh" ]]; then
  source "$HOME/zsh-defer/zsh-defer.plugin.zsh"
fi

setopt autocd                  # cd just need folder name
setopt correct                 # suggest typo
setopt extended_glob           # globbing powerful
setopt prompt_subst            # for prevent prompt to be evaluated
