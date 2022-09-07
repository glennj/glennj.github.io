# Tools for processing JSON

## [jq]

_The_ JSON processing tool. The syntax is akin to a functional language, so it takes some getting used to.

[comment]: # (Note the empty brackets below.)
[comment]: # (This is needed to disambiguate the two consecutive links.)

The [exercism][] [bash test runner][] uses `jq` to
generate JSON: 
* The --arg and --argjson options to pass in individual values
* the --args and --jsonargs options, and the $ARGS.positional variable, to pass in lists of values

I've been building an exercism [jq track], so I've been learning it pretty intensely.
I've written [some notes](jq/notes) about studying the manual.

## [jo]

A small utility to create JSON objects from shell variables.

Example (take care with shell filename expansion
```sh
$ jo foo=bar baz[]=1 baz[]=2 baz[]=3 qux=
{"foo":"bar","baz":[1,2,3],"qux":null}
```
Lists can be handled with tricky parameter expansions
```sh
$ values=(1 2 3)
$ jo foo=bar "${values[@]/#/baz[]=}" qux=
{"foo":"bar","baz":[1,2,3],"qux":null}
```
Nested objects involve multiple calls to `jo`
```sh
$ set -- alpha beta gamma
$ jo foo=bar items="$(jo "${@/#/baz[]=}")" qux=
{"foo":"bar","items":{"baz":["alpha","beta","gamma"]},"qux":null}
```

## [gron]

"Flattens" JSON into a sequence of individual assignments, which makes it possible to use line-oriented tools (grep, etc) to process it.

Example:
```sh
$ echo '{"foo":"bar", "baz": [1, 2, 3], "qux": null}' | gron
json = {};
json.baz = [];
json.baz[0] = 1;
json.baz[1] = 2;
json.baz[2] = 3;
json.foo = "bar";
json.qux = null;
```
Using common tools to filter
```sh
$ echo '{"foo":"bar", "baz": [1, 2, 3], "qux": null}' | gron | grep '\.foo ='
json.foo = "bar";

$ echo '{"foo":"bar", "baz": [1, 2, 3], "qux": null}' \
  | gron \
  | awk -F ' = ' '$1 ~ /\.foo$/ {print $2}'
"bar";
```
and transform back to JSON with `gron -u` ("ungron")
```sh
$ echo '{"foo":"bar", "baz": [1, 2, 3], "qux": null}' \
  | gron \
  | grep '\.foo =' \
  | gron -u
{"foo":"bar"}
```


[jq]: https://stedolan.github.io/jq/
[exercism]: https://exercism.org
[bash test runner]: https://github.com/exercism/bash-test-runner/blob/main/bin/run.sh#L197
[jq track]: https://github.com/exercism/jq/
[gron]: https://github.com/tomnomnom/gron
[jo]: https://github.com/jpmens/jo

