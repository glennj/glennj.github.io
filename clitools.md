# Useful CLI Tools

## [bat][bat]

A blend of `cat`, `less`, `nl` with syntax highlighting.

## [delta][delta]

A side-by-side `diff`.

## [exa][exa]

A "modern replacement for `ls`".

These are my fish functions for the `ls` aliases I grew up with[^1]:
```sh
$ type ls ll la lh
ls is a function with definition
function ls --wraps=exa
  exa --classify $argv
end

ll is a function with definition
function ll --wraps=exa
  ls --long --links --git --header $argv
end

la is a function with definition
function la --wraps=exa
  ll --all $argv
end

lh is a function with definition
function lh --wraps=exa
  ll --sort=modified --reverse --color=always $argv | head -n 20
end
```

It also replaces `tree`:
```sh
$ type tree
tree is a function with definition
function tree --wraps=exa
  ll --tree $argv
end
```
---

[bat]: https://github.com/sharkdp/bat
[delta]: https://dandavison.github.io/delta/
[exa]: https://the.exa.website

[^1]: my bash aliases for these commands

    ```bash
    $ type ls ll la lh
    ls is aliased to `ls -F'
    ll is aliased to `ls -l'
    la is aliased to `ll -a'
    lh is a function
    lh ()
    {
        ls -F -l -t ${1+"$@"} | cat - | head -n 20
    }
    ```
