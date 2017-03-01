# Path Extra

Extra utils to work with FS paths. Do not use for URLs (FS specific).

#### Peer dependencies

* [NodeJS stdlib](https://nodejs.org/api/)
* [RamdaJS](http://ramdajs.com/)

## Examples

```js
let {pipe} = require("ramda")
let {withExt, withLeftDir} = require("path-extra")

pipe(
  withLeftDir("public"), withExt(".html")
)("content/some/index.md") // "public/some/index.html"
```

```js
let {padPath} = require("path-extra")

padPath(2, "content/1.folder/file.1.md") // "content/01.folder/file.01.md"
```

## Install

No NPM for now.

```json
// package.json
{
  "dependencies": {
    "path-extra": "https://github.com/ivan-kleshnin/path-extra"
  }
}
```

## API

#### `dir :: String -> String`

Alias for `path.dirname`.

#### `base :: String -> String`

Alias for `path.basename`.

#### `name :: String -> String`

```js
name("whatever/index.html") // "index"
name("whatever/.gitignore") // ".gitignore"
```

#### `ext :: String -> String`

```js
ext("whatever/index.html") // ".html"
ext("whatever/.gitignore") // ""
```

#### `leftDir :: String -> String`

```js
leftDir("foo/bar/index.html") // "foo"
leftDir("foo")                // ""
leftDir("foo/")               // "foo"
```

#### `rightDir :: String -> String`

```js
rightDir("foo/bar/index.html") // "bar"
rightDir("foo")                // ""
rightDir("foo/")               // "foo"
```

#### `addLeftDir :: String -> String -> String`

```js
addLeftDir("foo", "bar/index.html") // "foo/bar/index.html"
addLeftDir("foo", "")               // "foo/"
```

#### `addRightDir :: String -> String -> String`

```js
addLeftDir("foo", "bar/index.html") // "foo/bar/index.html"
addLeftDir("foo", "")               // "foo/"
```

#### `dropLeftDir :: String -> String`

```js
addRightDir("bar", "foo/index.html") // "foo/bar/index.html"
addRightDir("bar", "")               // "bar/"
```

#### `dropRightDir :: String -> String`

```js
dropRightDir("foo/bar/index.html") // "foo/index.html"
dropRightDir("index.html")         // "index.html"
```

#### `withLeftDir :: String -> String -> String`

```js
withLeftDir("qux", "foo/bar/index.html") // "qux/bar/index.html"
withLeftDir("qux", "index.html")         // "qux/index.html"
withLeftDir("qux", "")                   // "qux/"
```

#### `withRightDir :: String -> String -> String`

```js
withRightDir("qux", "foo/bar/index.html") // "foo/qux/index.html"
withRightDir("qux", "index.html")         // "qux/index.html"
withRightDir("qux", "")                   // "qux/"
```

#### `dropBase :: String -> String`

```js
dropBase("foo/bar/index.html") // "foo/bar/"
dropBase("index.html")         // ""
```

#### `dropExt :: String -> String`

```js
dropExt("foo/bar/index.html") // "foo/bar/index"
dropExt(".gitignore")         // ".gitignore"
```

#### `withDir :: String -> String -> String`

```js
withDir("bar", "foo/index.html") // "bar/index.html"
withDir("bar", "")               // "bar/"
```

#### `withBase :: String -> String -> String`

```js
withBase("index", "foo/page.html") // "foo/index"
withBase("index", "")              // "index"
```

#### `withName :: String -> String`

```js
withName("index", "foo/page.html") // "foo/index.html"
withName("index", "")              // "index"
```

#### `withExt :: String -> String`

```js
withExt(".html", "foo/index.md") // "foo/index.html"
withExt(".html", "")             // ".html"
```

#### `pad :: String -> Number -> String`

```js
pad("x", 4, "x") // "xxxx"
pad("0", 4, "x") // "000x"
pad("x", 1, "x") // "x"
```

#### `padNumeric :: Number -> String`

```js
padNumeric(4, "x") // "x"
padNumeric(4, "1") // "0001"
```

#### `padName :: Number -> String`

```js
padName(2, "1.1.foo.js") // "01.01.foo.js"
```

#### `padPath :: Number -> String`

```js
padPath(2, "1.folder/file.1.md") // "01.folder/file.01.md"
```
