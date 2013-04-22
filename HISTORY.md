### April 21, 2013
Fixed typo in `styles.css`. Fixed bug in default language selection, if
the user's language is not in my list then no language loads - I set en-us
to be the default. Fixed typo in config.xml.

### April 20, 2013
Improved language selection.

### April 19, 2013
Finished several translations. Added an interface to select a language (it
needs some improvement). Improve `addClass` and `removeClass`.

### April 14, 2013
Centered all text (vertically & horizontally). Made buttons more responsive
by increasing the "clickable" area. 'Debounced' the buttons so that you 
will not accidentally trigger multiple question changes. Also debounced
the resize event. Changed links - they now us javascript to set
`window.location.href`. Added `config.xml` for phonegap build.

### April 13, 2013
Improved code quality. Changed `escape` to `encodeURIComponent`. Organized
the files. Releasing under MIT license. Fixed bug in IE script loading. Made
some functions more generic.

### April 12, 2013
Added spanish translation and methods for loading a specific translation.
Did not add tools for selecting a language.
Improve stat colors (ie right=green, wrong=red when viewing results)

