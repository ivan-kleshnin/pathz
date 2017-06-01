# Path Extra

Functional utils for FS paths. Drop-in [NodeJS Path](https://nodejs.org/api/path.html) replacement.

### Features

* High-level path manipulations
* Curried composable API
* Crossplatform
* 64+ tests

## Motivation

```js
let PP = require("path")
let P = require("path-extra")
```

#### 1. Path.format / Path.parse are quite low-level

#### 2. Path-Extra respects trailing OS sep

```js
console.log(PP.dirname("/foo/bar/")) // "/foo"
console.log(P.dir("/foo/bar/"))      // "/foo/bar/"

console.log(PP.basename("/foo/bar/")) // "bar"
console.log(P.base("/foo/bar/"))      // ""
```

#### 3. Path-Extra respects "relativeness" and "absoluteness" of paths

```js
console.log(P.addLeftDir("bar", "/foo.txt"))  // "/bar/foo.txt" (+)
console.log(PP.join("bar", "/foo.txt"))       // "bar/foo.txt"  (-)

console.log(P.addRightDir("bar", "/foo.txt")) // "/bar/foo.txt" (+)
console.log(PP.join("/foo.txt", "bar"))       // "/foo.txt/bar" (-)
```

#### 4. Path-Extra is composition friendly

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

#### 5. Path-Extra is CRUD for path fragments

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

## Install

No NPM for now (name choice in progress).

```json
// package.json
{
  "dependencies": {
    "path-extra": "https://github.com/ivan-kleshnin/path-extra"
  }
}
```

### Peer dependencies

* [NodeJS stdlib](https://nodejs.org/api/)
* [RamdaJS](http://ramdajs.com/)

## API

#### `dir :: String -> String`

```js
P.dir("foo/bar/baz.txt") // "foo/bar/" (P.dirname + "/")
P.dir("foo/bar/")        // "foo/bar/" (identity)
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

