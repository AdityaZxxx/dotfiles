###################################
# Plugins
###################################
# Lazy load with zsh-defer
if (( $+functions[zsh-defer] )); then
  zsh-defer source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
  zsh-defer source /usr/share/zsh/plugins/fast-syntax-highlighting/fast-syntax-highlighting.plugin.zsh
else
  source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
  source /usr/share/zsh/plugins/fast-syntax-highlighting/fast-syntax-highlighting.plugin.zsh
fi

ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=8"
ZSH_AUTOSUGGEST_STRATEGY=(history completion)
