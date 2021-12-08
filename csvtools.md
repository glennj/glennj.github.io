# Tools for processing CSV files

## [csvkit][csvkit]

A suite of tools, implemented in Python. [Install with `pip`][csvkit-install].

## [miller][mlr]

General purpose blender of data. 

## [OCaml CSV][ocaml-csv]

* this one can transpose
* implemented in OCaml: installation
    1. install [`opam`][opam], the OCaml package manager, 
    1. `opam install csvtool`
* <details><summary>click for usage...</summary>

    ---
    ```sh
    $ csvtool --help
    ```
    ```
    csvtool - Copyright (C) 2005-2006 Richard W.M. Jones, Merjis Ltd.
            - Copyright (C) 2007- Richard W.M. Jones & Christophe Troestler
    
    csvtool is a tool for performing manipulations on CSV files from shell scripts.
    
    Summary:
      csvtool [-options] command [command-args] input.csv [input2.csv [...]]
    
    Commands:
      col <column-spec>
        Return one or more columns from the CSV file.
    
        For <column-spec>, see below.
    
          Example: csvtool col 1-3,6 input.csv > output.csv
    
      namedcol <names>
        Assuming the first row of the CSV file is a list of column headings,
        this returned the column(s) with the named headings.
    
        <names> is a comma-separated list of names.
    
          Example: csvtool namedcol Account,Cost input.csv > output.csv
    
      width
        Print the maximum width of the CSV file (number of columns in the
        widest row).
    
      height
        Print the number of rows in the CSV file.
    
        For most CSV files this is equivalent to 'wc -l', but note that
        some CSV files can contain a row which breaks over two (or more)
        lines.
    
      setcolumns cols
        Set the number of columns to cols (this also makes the CSV file
        square).  Any short rows are padding with blank cells.  Any
        long rows are truncated.
    
      setrows rows
        'setrows n' sets the number of rows to 'n'.  If there are fewer
        than 'n' rows in the CSV files, then empty blank lines are added.
    
      head rows
      take rows
        'head n' and 'take n' (which are synonyms) take the first 'n'
        rows.  If there are fewer than 'n' rows, padding is not added.
    
      drop rows
        Drop the first 'rows' rows and return the rest (if any).
    
          Example:
            To remove the headings from a CSV file with headings:
              csvtool drop 1 input.csv > output.csv
    
            To extract rows 11 through 20 from a file:
              csvtool drop 10 input.csv | csvtool take 10 - > output.csv
    
      cat
        This concatenates the input files together and writes them to
        the output.  You can use this to change the separator character.
    
          Example: csvtool -t TAB -u COMMA cat input.tsv > output.csv
    
      paste
        Concatenate the columns of the files together and write them to the
        output.
    
          Example: csvtool paste input1.csv input2.csv > output.csv
    
      pastecol <column-spec1> <column-spec2> input.csv update.csv
        Replace the content of the columns referenced by <column-spec1> in the
        file input.csv with the one of the corresponding column specified by
        <column-spec2> in update.csv.
    
          Example: csvtool pastecol 2-3 1- input.csv update.csv.csv > output.csv
    
      join <column-spec1> <column-spec2>
        Join (collate) multiple CSV files together.
    
        <column-spec1> controls which columns are compared.
    
        <column-spec2> controls which columns are copied into the new file.
    
          Example:
            csvtool join 1 2 coll1.csv coll2.csv > output.csv
    
            In the above example, if coll1.csv contains:
              Computers,$40
              Software,$100
            and coll2.csv contains:
              Computers,$50
            then the output will be:
              Computers,$40,$50
              Software,$100,
    
      square
        Make the CSV square, so all rows have the same length.
    
          Example: csvtool square input.csv > input-square.csv
    
      trim [tlrb]+
        Trim empty cells at the top/left/right/bottom of the CSV file.
    
          Example:
            csvtool trim t input.csv    # trims empty rows at the top only
            csvtool trim tb input.csv   # trims empty rows at the top & bottom
            csvtool trim lr input.csv   # trims empty columns at left & right
            csvtool trim tlrb input.csv # trims empty rows/columns all around
    
      sub r c rows cols
        Take a square subset of the CSV, top left at row r, column c, which
        is rows deep and cols wide.  'r' and 'c' count from 1, or
        from 0 if -z option is given.
    
      replace <column-spec> update.csv original.csv
        Replace rows in original.csv with rows from update.csv.  The columns
        in <column-spec> only are used to compare rows in input.csv and
        update.csv to see if they are candidates for replacement.
    
          Example:
            csvtool replace 3 updates.csv original.csv > new.csv
            mv new.csv original.csv
    
      transpose input.csv
        Transpose the lines and columns of the CSV file.
    
      format fmt
        Print each row of the files according to the format 'fmt'.
        Each occurrence of "%i" or "%(i)" (where 'i' is a number) in
        'fmt' is replaced by the content of column number 'i' (remember
        that the leftmost column is numbered 1 in the traditional
        spreadsheet fashion).  A literal percent is obtained by doubling it.
        The usual escape sequences \n, \r, and \t are recognized.
    
          Example:
            csvtool format '%(1) -> %8%%\n' input.csv
    
      call command
        This calls the external command (or shell function) 'command'
        followed by a parameter for each column in the CSV file.  The
        external command is called once for each row in the CSV file.
        If any command returns a non-zero exit code then the whole
        program terminates.
    
          Tip:
            Use the shell command 'export -f funcname' to export
            a shell function for use as a command.  Within the
            function, use the positional parameters $1, $2, ...
            to refer to the columns.
    
          Example (with a shell function):
            function test {
              echo Column 1: $1
              echo Column 2: $2
            }
            export -f test
            csvtool call test my.csv
    
            In the above example, if my.csv contains:
              how,now
              brown,cow
            then the output is:
              Column 1: how
              Column 2: now
              Column 1: brown
              Column 2: cow
    
      readable
        Print the input CSV in a readable format.
    
    Column specs:
      A <column-spec> is a comma-separated list of column numbers
      or column ranges.
    
        Examples:
          1                       Column 1 (the first, leftmost column)
          2,5,7                   Columns 2, 5 and 7
          1-3,5                   Columns 1, 2, 3 and 5
          1,5-                    Columns 1, 5 and up.
    
      Columns are numbered starting from 1 unless the -z option is given.
    
    Input files:
      csvtool takes a list of input file(s) from the command line.
    
      If an input filename is '-' then take input from stdin.
    
    Output file:
      Normally the output is written to stdout.  Use the -o option
      to override this.
    
    Separators:
      The default separator character is , (comma).  To change this
      on input or output see the -t and -u options respectively.
    
      Use -t TAB or -u TAB (literally T-A-B!) to specify tab-separated
      files.
    
    Options:
      -t Input separator char.  Use -t TAB for tab separated input.
      -u Output separator char.  Use -u TAB for tab separated output.
      -o Write output to file (instead of stdout)
      -z Number columns from 0 instead of 1
      -help  Display this list of options
      --help  Display this list of options
    ```

    ---
    </details>

[csvkit]: https://csvkit.readthedocs.io/en/latest/
[csvkit-install]: https://csvkit.readthedocs.io/en/latest/tutorial/1_getting_started.html#installing-csvkit
[mlr]: https://miller.readthedocs.io/en/latest/
[ocaml-csv]: https://github.com/Chris00/ocaml-csv
[opam]: https://opam.ocaml.org/doc/Install.html
