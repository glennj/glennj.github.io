# Bash

The canonical bash sources are hosted at gnu.org
However, this site has a tendancy to be unresponsive.

I have build bash v5.3 and put the docs here:

* [bash man page](./bash.html)
* [bash reference manual](./bashref.html)

## Version

This is not up-to-date with the latest patch version, but it's the current minor version:

```sh
$ ~/bash/5.3/bin/bash --version
GNU bash, version 5.3.0(1)-release (x86_64-pc-linux-gnu)
Copyright (C) 2025 Free Software Foundation, Inc.
```

## Source

I downloaded the bash 5.3 tarball from [Chet Ramsey's bash page](https://tiswww.case.edu/php/chet/bash/bashtop.html).
Chet Ramsey is the long-time bash maintainer.
Bash can be built with:

```sh
sudo apt install build-essential texinfo
cd /path/to/bash/source
./configure --prefix=/path/to/destination  # e.g. $HOME/bash/5.3
make && make install
cd ./doc
make install-html
```

That installs the html pages to `/path/to/destination/share/doc/bash`
