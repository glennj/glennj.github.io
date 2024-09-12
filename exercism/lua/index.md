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


[article]: https://exercism.org/tracks/lua/exercises/high-scores/articles/oop
[oop]: ./oop
