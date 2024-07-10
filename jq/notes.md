# `jq`

Of course, [the `jq` manual][manual] is the source.

[manual]: https://jqlang.github.io/jq/manual/v1.6

## Filters/Functions/Operators Categorized


### Strings

* `+`
    - concatenate strings

* `*`
    - repeat the string that many times

* `/`
    - split the first string using the 2nd string as the separator

* `explode`
    - output an array of the string's _codepoints_

* `implode`
    - inverse of `explode`
    - input is an array of codepoints
    - output is a string

* `inside($str)`
    - true if the input string is a _substring_ of the argument $str

* `contains($substr)`
    - true if the $substr is `inside` the input string
    
* `startswith(str)`, `endswith(str)`
    - .

* `ltrimstr(str)`, `rtrimstr(str)`
    - not recursive/repetitive

        ```jq
        "hellooo" | rtrimstr("o")
        # => "helloo"
        ```

* `split(str)`
    - `split("")` returns an array of the input's characters

* `ascii_downcase`, `ascii_upcase`

* string interpolation: `"\(some expression)"`

#### Regular expression

[Oniguruma]


* `test(regex)`, `test(regex; flags)`
    - returns boolean

* `match(regex)`, `match(regex; flags)`
    - returns a [match] _object_
        ```jq
        "foobar" | match("(?<first>...)(?<second>...)")
        # => {
        # =>   "offset": 0,
        # =>   "length": 6,
        # =>   "string": "foobar",
        # =>   "captures": [
        # =>     {
        # =>       "offset": 0,
        # =>       "length": 3,
        # =>       "string": "foo",
        # =>       "name": "first"
        # =>     },
        # =>     {
        # =>       "offset": 3,
        # =>       "length": 3,
        # =>       "string": "bar",
        # =>       "name": "second"
        # =>     }
        # =>   ]
        # => }
        ```

    - what about no match? Returns `empty`

* `scan(regex)`, `scan(regex; flags)`
    - returns a **stream** of matched substrings

* `capture(regex)`, `capture(regex; flags)`
    - returns an **object** mapping capture name to substring

        ```jq
        "foobar" | capture("(?<first>...)(?<second>...)")
        # => { "first": "foo", "second": "bar" }
        ```

* `sub(regex; string)`, `sub(regex; string; flags)`
* `gsub(regex; string)`, `gsub(regex; string; flags)`

[Oniguruma]: https://raw.githubusercontent.com/kkos/oniguruma/master/doc/RE
[match]: https://jqlang.github.io/jq/manual/v1.6/#match

### Arrays

* `.[]` 
    - explode an array into a stream of its elements

* `.[idx]` 
    - element at index `idx`
    - zero-based

* `.[from;to]`
    - array slice
    - from index `from` (inclusive) up to index `to` (**exclusive**)

* `+`
    - concatenate arrays

* `-`
    - remove elements from the 2nd array from the first array

* `add`
    - input is array of arrays
    - output is an array of all elements of all sub-arrays

* `indices(subarray)`
    - output an array of indices indicating where the subarray
      exists inside the input array

        ```jq
        [1, 2, 3, 4, 2, 3, 5] | indices([2, 3])
        # => [1, 4]
        ```

* `contains(elems)`
    - true if _every_ element of `elems` satisfies the _string_ `contains`
      on _some element_ of the input array.
    - this is **not** an element-equality comparison

        ```jq
        ["foobar"] | contains(["foo", "bar"])
        # => true
        ```

* `inside(ary)`
    - inverse of `contains`
    - same caveat
    
* `length`
    - obv

* `map(filter)`
    - .

* `sort`, `sort_by(path_exp)`
    - .

* `group_by(path_exp)`

* `unique`, `unique_by(path_exp)` 
    - unique elements of input array
    - sorted

* `min`, `max`, `min_by(path_exp)`, `max_by(path_exp)` 

* `join(str)`

* `transpose`

* `bsearch(x)`
    - binary search
    - still does `contains` test though

### Objects

* `+`
    - merge objects
    - use values from RHS where keys conflict

* `*`
    - like `+` but descend recursively for common keys that have objects as
      values

* `keys`, `keys_unsorted`
    - .

* `del(key)`
    - removes the key and its value

* `has(key)`
    - .

* `in(obj)`
    - inverse of `has`

* `map_values(filter)`
    - runs the filter on each value

        ```jq
        {a:1, b:2} | map_values(. + 10)
        # => {a: 11, b: 12}
        ```

* `to_entries`
    - convert a object to an array of `{key, value}` objects

        ```jq
        {a:1, b:2} | to_entries
        # => [{ key: "a", value: 1}, {key: "b", value: 2}]
        ```

        Works with arrays too: the keys are the numeric indexes

        ```jq
        ["foo", "bar", "baz"] | to_entries
        # => [{"key":0,"value":"foo"},{"key":1,"value":"bar"},{"key":2,"value":"baz"}]
        ```

    - `from_entries` is the inverse
        - can't do `from_entries` on `array|to_entries` -- keys aren't strings.

    - `with_entries(foo)` is a shorthand for

        ```jq
        to_entries | map(foo) | from_entries
        ```


### Non-Type-Specific

* `empty`
    - "returns no results. None at all. Not even null." (from the manual)

* `select(filter)`
    - if `filter` outputs a true value, pass the input unchanged
    - otherwise, output `empty`
    - filtering an array uses map and select

        ```jq
        [1, 2, 3, 4] | map(select(. < 3))
        # => [1, 2]
        ```
* `reduce exp as $item (initial; reducer)`
    - input is fed to `exp` and each result is bound to `$item`
    - in the `reducer`, `.` is the accumulator
    - so if you need the input in the reducer, save it in a variable.


* `error(msg)`, `halt`, `halt_error`, `halt_error(exit_status)`
    - `error` can be caught with `try exp1 catch exp2`
    - `halt` exits with status 0
    - `halt_error` is like `error(.) | halt` but with the given exit\_status
      (default: 5)

* `range(upto)`, `range(from; upto)`, `range(from; upto; by)`
    - `from` (default zero) is _inclusive_
    - `upto` is _exclusive_

* `tostring`
    - JSON encode the input

* `$ENV`
    - an object holding the environment
    - `env`, outputs `$ENV`
    - jq doesn't do IO, so no _setting_ the environment

### Formatting

* `@text` calls `tostring`
* `@json` to serialize
* `@html` XML encoding
* `@uri` percent encoding
* `@csv`
* `@tsv`
* `@sh`
* `@base64`, `@base64d`

### Dates

See [Dates]

[Dates]: https://jqlang.github.io/jq/manual/v1.6/#dates

### Conditionals

* `if A then B else C end`
    - `else` clause required in v1.6

* `and`, `or`, `not`

* "alternative operator" `a // b`
    - short for `if a then a else b end`
    - truthiness:
        - `false` and `null` are _false_
        - everything else is _true_

### Variables

* `exp as $identifier | ...`
    - for each value of expression `exp`, run the rest of the pipeline with
      the entire original input, and with `$x` set to that value.
    - to reiterate, the input is passed through

* destructuring
    - example: `. as {realnames: $names, posts: [$first, $second]} | ..`


### Defining functions

* `def identifier: exp;`
    - trailing semicolon

* `def identifier(arg1; arg2; ...): exp;`
    - args separate with semicolons

* `def identifier($arg1): exp;`
    - shorthand for: `def identifier(arg): arg as $arg | exp;`
    - This caused me confusion in this situation:

        ```jq
        def code: ...;

        def encipher($code); 
            (. | code) as $result
            | ...;

        ("xyz" | code) as $key
        | "foobar" | encipher($key)
        ```

        I was baffled that `$result` was always `$key` instead of calling
        the **function** `code`.

        Eventually the "arg as $arg" shortcut dawned on me:
        `code` was the argument filter passed in, overriding the function.


### Math

* double precision numbers: 53-bits of precision
* one input: `value | func`
    - `floor`, `ceil`, `round`, `sqrt`, `exp`, `log`, `cos`, etc
* two input: `func(arg1; arg2)`
    - `hypot`, `pow`, etc


### IO

* `input`, `inputs`

* `input_filename`, `input_line_number`
    - looks like we can do some awk-ish things

* `debug`

* `stderr`
    - sends it's input to stderr (no newline) and also outputs to pipeline

### Modules

* `include RelativePathString;`
    - ".jq" suffix will be appended to RelativePathString

* `import RelativePathString as Name;`
    - `include`s code inside the `Name` namespace
    - ".jq" suffix will be appended to RelativePathString
    - functions invoked as `Name::funcname`

* `import RelativePathString as $Name;`
    - reads JSON data in file into `$Name::Name` binding
    - "**.json**" suffix will be appended to RelativePathString

### Ones that I need to study further

* `any` and `all`

* `while(cond; update)`, `until(cond; update)`

* `foreach exp as $var (init; update; extract)`

* `break $label`

* `limit(n; exp)` and `nth(n; exp)` and generators
    - i.e. nth-prime exercise
    - example from manual:

        ```sh
        echo 1 | jq '
            # re-implement builtin `while`
            def while(cond; update):
                def _while:
                    if cond
                    then ., (update | _while)
                    else empty
                    end;
                _while;

            # generate an infinite stream of doubling numbers, 
            # but take the 5th result and quit
            nth(5; while(true; .*2))
        '
        32
        ```

* [Assignment]

[Assignment]: https://jqlang.github.io/jq/manual/v1.6/#assignment 

## Snippets

* histgram

    ```sh
    $ jq -n '"hello" / "" | group_by(.) | map({key: .[0], value: length}) | from_entries'
    {
      "e": 1,
      "h": 1,
      "l": 2,
      "o": 1
    }
    ```

* two arrays have the same elements:

    ```jq
    [1,2,3] == [3,2,1]
    # => false
    ,
    ([1,2,3] | inside([3,2,1])) and ([1,2,3] | contains([3,2,1]))
    # => true
    ```
    
    Better expressed using [`IN`][man-in] and [`all`][man-all]

    ```jq
    [1, 2, 3] | all(IN([3, 2, 1] | .[]))
    # => true
    ```
    The `IN` argument is a _stream_


[man-all]: https://jqlang.github.io/jq/manual/#all
[man-in]: https://jqlang.github.io/jq/manual/#sql-style-operators
