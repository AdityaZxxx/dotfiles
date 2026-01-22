source ~/zsh-defer/zsh-defer.plugin.zsh

for file in $HOME/.config/zsh/*.zsh; do
  source $file
done

for f in $HOME/.config/zsh/*.zsh; do
  [ -f $f ] && zcompile $f
done
