# Pathz

Functional toolkit for file/dir paths. Drop-in [`path`](https://nodejs.org/api/path.html) replacement.
Originally built for a static site generator where path transformations are common, but use-cases
are really unlimited.

### Features

* High-level path manipulations
* Curried composable API
* Crossplatform: works in NodeJS and all modern browsers
* Extensive test suite

Peer dependencies:
* [`@paqmind/ramda`](http://ramdajs.com/) (temp. until basic Ramda)

Dependencies:
* [`path`](https://nodejs.org/api/path) / [`path-webpack`](https://github.com/fchasen/path-webpack)

## Usage

```
$ npm install pathz
```

```js
let P = require("pathz") // defaults to either POSIX or WIN32
let P_posix = require("pathz/posix") // POSIX (P.sep is / etc.)
let P_win32 = require("pathz/win32") // WIN32 (P.sep is \ etc.)

// The following snippets also use shortcuts for:
let R = require("ramda")
let PP = require("path")
```

### Browser

Webpack's `path-browserify` dependency (polyfill of `path`) is very old and severily [bugged](https://github.com/substack/path-browserify/issues).
Hey, it doesn't even provide a `parse` function! So you'll have to substitute it with another package.

```
$ npm install path-webpack
```

Add the following to your `webpack.config.js`:

```js
resolve: {
  alias: {
    path: "path-webpack"
  }
}
```

This can fix other libraries naively depending on `path` as well. Other bundlers, like Browserify
or Rollup, should support such replacement as well.

## Motivation

#### 1. Original `format` / `parse` provide limited, low-level, mutable API

#### 2. `pathz` respects trailing separators as possible directory indicator

```js
console.log(PP.dirname("/foo/bar/")) // "/foo"
console.log(P.dir("/foo/bar/"))      // "/foo/bar/"

console.log(PP.basename("/foo/bar/")) // "bar"
console.log(P.base("/foo/bar/"))      // ""
```

#### 3. `pathz` respects "relativeness" and "absoluteness" of paths

```js
console.log(P.addLeftDir("bar", "/foo.txt"))  // "/bar/foo.txt" (+)
console.log(PP.join("bar", "/foo.txt"))       // "bar/foo.txt"  (-) naive

console.log(P.addRightDir("bar", "/foo.txt")) // "/bar/foo.txt" (+)
console.log(PP.join("/foo.txt", "bar"))       // "/foo.txt/bar" (-) naive
```

#### 4. `pathz` is composition friendly

```js
let R = require("ramda")

let src = "content/team/about.md"
let dst = R.pipe(
  P.withLeftDir("public"),
  P.addRightDir(P.name(src)),
  P.withBase("index.html")
)(src)

console.log(dst) // "public/team/about/index.html"
                 // corresponding to "/team/about/" URL
```

#### 5. `pathz` is like CRUD for path fragments

```js
// GET
console.log(P.leftDir("/foo/bar/baz.txt"))  // "foo"
console.log(P.rightDir("/foo/bar/baz.txt")) // "bar"

// UPDATE
console.log(P.withLeftDir ("qux", "/foo/bar/baz.txt")) // "/qux/bar/baz.txt"
console.log(P.withRightDir("qux", "/foo/bar/baz.txt")) // "/foo/qux/baz.txt"

// DELETE
console.log(P.dropLeftDir ("/foo/bar/baz.txt")) // "/bar/baz.txt"
console.log(P.dropRightDir("/foo/bar/baz.txt")) // "/foo/baz.txt"

// ...
```

#### 6. `pathz` provides extra utils

```js
R.sortBy(P.padPath(2))([
  "foo/bar/11.1/2.1",
  "foo/bar/2.1/10.1",
  "foo/bar/10.1/2.1",
  "foo/bar/2.1/2.1",
])

// [ 'foo/bar/2.1/2.1',
//   'foo/bar/2.1/10.1',
//   'foo/bar/10.1/2.1',
//   'foo/bar/11.1/2.1' ]
```

## API

#### `dir :: String -> String`

```js
P.dir("foo/bar/baz.txt")  // "foo/bar/" (P.dirname + "/")
P.dir("foo/bar/")         // "foo/bar/" (identity)
P.dir("/foo/bar/baz.txt") // "/foo/bar/" (P.dirname + "/")
P.dir("/foo/bar/")        // "/foo/bar/" (identity)
```

#### `splitDirs :: String -> [String]`

```js
P.splitDirs("foo/bar/baz.txt")  // ["foo", "bar"]
P.splitDirs("/foo/bar/")        // ["foo", "bar"]
```

#### `base :: String -> String`

```js
P.base("foo/bar/baz.txt") // "baz.txt" (P.basename)
P.base("foo/bar/")        // ""        (zero)
```

#### `name :: String -> String`

```js
P.name("whatever/index.html") // "index"
P.name("whatever/.gitignore") // ".gitignore"
```

#### `ext :: String -> String`

```js
P.ext("whatever/index.html") // ".html"
P.ext("whatever/.gitignore") // ""
```

#### `leftDir :: String -> String`

```js
P.leftDir("foo/bar/index.html") // "foo"
P.leftDir("foo")                // ""
P.leftDir("foo/")               // "foo"
```

#### `rightDir :: String -> String`

```js
P.rightDir("foo/bar/index.html") // "bar"
P.rightDir("foo")                // ""
P.rightDir("foo/")               // "foo"
```

#### `leftDirs :: Number -> String -> String`

```js
P.leftDirs(1) == P.leftDir
P.leftDirs(2, "foo/bar/baz/qux.txt")  // "foo/bar"
P.leftDirs(3, "foo/bar/baz/qux.txt")  // "foo/bar/baz"
P.leftDirs(4, "/foo/bar/baz/qux.txt") // "foo/bar/baz"
```

#### `rightDirs :: Number -> String -> String`

```js
P.rightDirs(1) == P.rightDir
P.rightDirs(2, "foo/bar/baz/qux.txt")  // "bar/baz"
P.rightDirs(3, "foo/bar/baz/qux.txt")  // "foo/bar/baz"
P.rightDirs(4, "/foo/bar/baz/qux.txt") // "foo/bar/baz"
```

#### `addLeftDir :: String -> String -> String`

```js
P.addLeftDir("foo", "bar/index.html") // "foo/bar/index.html"
P.addLeftDir("foo", "")               // "foo/"
```

#### `addRightDir :: String -> String -> String`

```js
P.addLeftDir("foo", "bar/index.html") // "foo/bar/index.html"
P.addLeftDir("foo", "")               // "foo/"
```

#### `withLeftDir :: String -> String -> String`

```js
P.withLeftDir("qux", "foo/bar/index.html") // "qux/bar/index.html"
P.withLeftDir("qux", "index.html")         // "qux/index.html"
P.withLeftDir("qux", "")                   // "qux/"
```

#### `withRightDir :: String -> String -> String`

```js
P.withRightDir("qux", "foo/bar/index.html") // "foo/qux/index.html"
P.withRightDir("qux", "index.html")         // "qux/index.html"
P.withRightDir("qux", "")                   // "qux/"
```

#### `dropLeftDir :: String -> String`

```js
P.addRightDir("bar", "foo/index.html") // "foo/bar/index.html"
P.addRightDir("bar", "")               // "bar/"
```

#### `dropRightDir :: String -> String`

```js
P.dropRightDir("foo/bar/index.html") // "foo/index.html"
P.dropRightDir("index.html")         // "index.html"
```

#### `withDir :: String -> String -> String`

```js
P.withDir("bar", "foo/index.html") // "bar/index.html"
P.withDir("bar", "")               // "bar/"
```

#### `withBase :: String -> String -> String`

```js
P.withBase("index", "foo/page.html") // "foo/index"
P.withBase("index", "")              // "index"
```

#### `withName :: String -> String`

```js
P.withName("index", "foo/page.html") // "foo/index.html"
P.withName("index", "")              // "index"
```

#### `withExt :: String -> String`

```js
P.withExt(".html", "foo/index.md") // "foo/index.html"
P.withExt(".html", "")             // ".html"
```

#### `dropBase :: String -> String`

```js
P.dropBase("foo/bar/index.html") // "foo/bar/"
P.dropBase("index.html")         // ""
```

#### `dropExt :: String -> String`

```js
P.dropExt("foo/bar/index.html") // "foo/bar/index"
P.dropExt(".gitignore")         // ".gitignore"
```

#### `padNumeric :: Number -> String`

```js
P.padNumeric(4, "x") // "x"
P.padNumeric(4, "1") // "0001"
```

#### `padName :: Number -> String`

```js
P.padName(2, "1.1.foo.js") // "01.01.foo.js"
```

#### `padPath :: Number -> String`

```js
P.padPath(2, "1.folder/file.1.md") // "01.folder/file.01.md"
```

## Original API

* `delimiter`: low-level, import directly
* `posix`: low-level, import directly
* `sep`: low-level, import directly
* `win32`: low-level, import directly
* `basename`: wrapped, use `P.base` instead
* `dirname`: wrapped, use `P.dir` instead
* `extname`: wrapped, use `P.ext` instead
* `format`: wrapped, use `P` helpers instead
* `parse`: wrapped, use `P` helpers instead
* `isAbsolute`: reexported
* `join`: reexported
* `normalize`: reexported
* `relative`: reexported
* `resolve`: reexported
