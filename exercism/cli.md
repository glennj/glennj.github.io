# Exercism CLI

I like to work at the command line.
I like tools (like git for example) that are `command subcommand args ...`
The [Exercism CLI][cli] works like this.

It is used mainly to download an exercise, and to submit your solution.

## Adding functionality to it

One of the downsides of the `exercism download` subcommand is that it prints the directory where the exercise was downloaded to, but it does not `cd` to it. 
If fact it cannot: a child program cannot alter the environment of the parent process.

But, we can write a shell function that wraps the exercism cli.
This function can capture the output of the download and change to the new directory.

I'll assume your shell is bash. You can add this function to your `~/.bashrc`

```bash
exercism () {
    case "$1" in
        download)
            local out
            readarray -t out < <(command exercism "$@")
            printf '%s\n' "${out[@]}"
            if [[ -d "${out[-1]}" ]]; then
                cd "${out[-1]}" || return 1
            fi
            ;;
        *) command exercism "$@" ;;
    esac
}
```

If you are using the `download` subcommand, it will execute the exercism command, capture the output, and check if the last line is a directory.
If it is, then cd do it.

Otherwise, it will pass on any arguments to the exercism command.

This demonstrates the shell wrapper technique: examine the arguments, do special actions, otherwise pass control back to the command you're wrapping.

## Running exercise tests

`exercism` has recently been upgraded with a `test` subcommand.
This will run the unit tests for the exercise you're currently working on.

* download an exercise: `exercism download -t someTrack -e someExercise`
* write some code
* test it: `exercism test`
* when it passes: `exercism submit`

It's a fantastic addition that does "The Right Thing"™ to invoke the test suite for [_most tracks_][cli-test-tracks].

Common Lisp is one such excluded track.
Unfortunately Common Lisp does not benefit because there is no single prescribed way to run the tests.

I chose Roswell as my Common Lisp interpreter manager.
Here's an extension of the `exercism` bash wrapper that adds functionality to the `test` subcommand.

```bash
exercism () {
    case "$1" in
        download)
            local out
            readarray -t out < <(command exercism "$@")
            printf '%s\n' "${out[@]}"
            if [[ -d "${out[-1]}" ]]; then
                cd "${out[-1]}" || return 1
            fi
            ;;
        test)
            if [[ $PWD =~ "$(command exercism workspace)/common-lisp/"([^/]+) ]]
            then
                local exercise=${BASH_REMATCH[1]}
                ros run --load "${exercise}-test" \
                        --eval "(exit :code (if (${exercise}-test:run-tests) 0 1))"
            else
                command exercism "$@"
            fi
            ;;
        *) command exercism "$@" ;;
    esac
}
```

That uses a shell regular expression to see if you're current directory is a Common Lisp exercise.
If so, it will say the `ros` incantation to run the tests.
If not, it will run the default `exercism test` for wherever you are.


## The Fish shell

I don't use bash as my interactive shell, I use [fish][fish].
It has superior completions and history recall.

I took the above concepts about extending `exercism` and built a whole lot of new functionality in my [fish wrapper around `exercism`][fish-wrapper].

[cli]: https://exercism.org/docs/using/solving-exercises/working-locally
[cli-test-tracks]: https://github.com/exercism/cli/blob/0e017aa3b5f72c8796609557c05f1308ce714d30/workspace/test_configurations.go#L63
[fish]: https://fishshell.com/
[fish-wrapper]:  https://github.com/glennj/exercism-cli-fish-wrapper
