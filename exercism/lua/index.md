# Lua

One the tracks on Exercism I found interesting is Lua.
Lua and Tcl are kind of in the same arena: small languages often embedded in other applications.

Lua is far smaller than Tcl, with less builtin functionality, but it's still quite capable (and extremely fast).


## Object Oriented Lua

Lua OO is kind of tricky to wrap your head around.
You're either going to pick a closure-based approach (where the constructor function will return a table containing function elements and access the data from the constructor function's scope), or you're going to pick a metatable-based approach (which more closely resembles "traditional" OO class/instance style).

Since metatables are a new concept to a lot of Lua students, I wrote an article about it.
Unfortunately, it's kind of [hidden on the Exercism website][article], so I'll reproduce it here.

> **[A brief OOP tutorial][oop]**


## Ranting about Lua datetime functions

_2026-03-01_

Regarding the utility of the [`os.date`][os-date] formatting string and the `!` prefix.

The problem is that the `!` _converts_ the time value from local time to UTC time.

There's no way to use [`os.time`][os-time] to interpret the table it's given as already being in UTC: I'm in the Eastern TZ

```lua
> t = {['year']=2014, ['month']=11, ['day']=1, ['hour']=20, ['min']=0, ['sec']=0}
> epoch = os.time(t)
> epoch
1414886400
> os.date('%c', epoch)
Sat Nov  1 20:00:00 2014
> os.date('!%c', epoch)
Sun Nov  2 00:00:00 2014
```

The `hour=20` is treated as the **local** time.
I can't tell Lua that I wish the input time table to be 8pm in UTC.

Consider GNU `date` command: you get a different time value when you tell it the input time is in UTC

```sh
$ date -d '2014-11-01 20:00:00' '+%s'
1414886400
$ date -d '2014-11-01 20:00:00' --utc '+%s'
1414872000
```

IMO, if you're parsing a datetime string, manipulating it, and then formatting it back into a string, `!` is not helpful.
[These tests][gigasecond-spec] are only passing because `%x` only considers the date part
(the [canonical data][gigasecond-canonical] expects the full datetime).

I'm working on the swift-scheduling exercise in moonscript and I'm considering adding the [date][date-rock] rock to the test-runner.
With this luarock:

```lua
date = require 'date'

-- to find a date object's epoch time in seconds is a bit clunky:
-- subtract the epoch date from the dateObj and get the seconds from the delta.
function totime(dateObj)
    return (dateObj - date.epoch()):spanseconds()
end

utc = date('2014-11-01 20:00:00')
print(totime(utc))  -- 1414872000.0 -- same as GNU date with --utc flag

edt = date('2014-11-01 20:00:00 EDT')
print(totime(edt))  -- 1414886400.0
```

Now we can see that we need a UTC time value to get the date in UTC:
```lua
-- UTC timestamp with a local format string is _wrong_
print(os.date('%F %T', totime(utc))) -- 2014-11-01 16:00:00

-- UTC timestamp with a UTC format string is _right_
print(os.date('!%F %T', totime(utc))) -- 2014-11-01 20:00:00

-- local timestamp with a local format string is _right_
print(s.date('%F %T', totime(edt))) -- 2014-11-01 20:00:00

-- local timestamp with a UTC format string is _wrong_
print(s.date('!%F %T', totime(edt))) -- 2014-11-02 00:00:00
```

...

My rant gets somewhat blunted when I actually read the [canonical-data][gigasecond-canonical] and see

> "Most test programs currently check only the date and ignore the time.",

_Sigh._

[article]: https://exercism.org/tracks/lua/exercises/high-scores/articles/oop
[oop]: ./oop
[date-rock]: https://luarocks.org/modules/tieske/date
[os-date]: https://www.lua.org/manual/5.4/manual.html#pdf-os.date
[os-time]: https://www.lua.org/manual/5.4/manual.html#pdf-os.time
[gigasecond-spec]: https://github.com/exercism/lua/blob/d42266dcd372b6bac6b924d9cf9846c3c233e412/exercises/practice/gigasecond/gigasecond_spec.lua
[gigasecond-canonical]: https://github.com/exercism/problem-specifications/blob/main/exercises/gigasecond/canonical-data.json
