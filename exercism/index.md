# Exercism

Exercism is [**exercism.org**][exercism], a place to learn new programming languages through TDD practice exercises.

## Journey

Some thoughts about my Exercism journey ...

* I can pinpoint the first time I ever heard about Exercism: [this Stackoverflow bash question][so-bash-bats].
* My first exercise submission was about 3 hours afterward: [Hello World on the bash track][ex-bash-hw].
* My first PR was about 7 months later: [porting the all-your-base exercise for bash][gh-ex-pr1].
* I ended up authoring 60 bash exercises and adding contributions to another 29:
  ```sh
  $ jq '.authors as $a | if ("glennj" | IN($a[])) then input_filename else empty end' exercises/practice/*/.meta/config.json | wc -l
  $ jq '(.contributors // []) as $c | if ("glennj" | IN($c[])) then input_filename else empty end' exercises/practice/*/.meta/config.json | wc -l
  ```
* and then I spread out to other tracks (like a virus...):
    * [tcl][gh-ex-tcl]
        * 117 practice exercises authored
        * go live [Sept 22, 2020](https://twitter.com/exercism_io/status/1308510860755775491)
    * [wren][gh-ex-wren]
        * 16 practice exercises in 2021 and 2022
        * I didn't contribute to the creation of the track, just added exercises and some contributions to [wren-console][wren-console-commits] and [related][wren-testie-commits] [repos][wren-essentials-commits].
    * [awk][gh-ex-awk]
        * 40 practice exercises
        * go live Jul 6, 2022 (can't find a tweet for it, maybe it was just on Slack)
    * [jq][gh-ex-jq]
        * 35 practice exercises, 12 concepts, 11 concept exercises
        * go live [Jan 18, 2023](https://twitter.com/exercism_io/status/1615684303765078016)

## My exercises

My exercises are [stored in git][gh-glennj-ex].
This repo includes my mentor notes.

## Exercism CLI tool

I have to link to my [fish wrapper around `exercism` CLI][fish-wrapper].


[exercism]: https://exercism.org
[powershell]: https://github.com/glennj/exercism.io/blob/main/powershell/journey.md
[fsharp]: https://github.com/glennj/exercism.io/tree/main/fsharp
[so-bash-bats]: https://stackoverflow.com/questions/52970751/exercism-bash-track
[ex-bash-hw]: https://exercism.org/tracks/bash/exercises/hello-world/solutions/glennj
[gh-ex-pr1]: https://github.com/exercism/bash/pull/278
[#12in23]: https://exercism.org/challenges/12in23
[gh-ex-jq]: https://github.com/exercism/jq
[gh-ex-tcl]: https://github.com/exercism/tcl
[gh-ex-awk]: https://github.com/exercism/awk
[gh-ex-wren]: https://github.com/exercism/wren
[gh-glennj-ex]: https://github.com/glennj/exercism.io
[fish-wrapper]:  https://github.com/glennj/exercism-cli-fish-wrapper
[wren-console-commits]: https://github.com/joshgoebel/wren-console/commits?author=glennj
[wren-testie-commits]: https://github.com/joshgoebel/wren-testie/commits?author=glennj
[wren-essentials-commits]: https://github.com/joshgoebel/wren-essentials/commits?author=glennj
