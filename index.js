// Some hacks until a proper tree shaking comes
let R = {}
R.head = require("ramda/src/head")
R.concat = require("ramda/src/concat")
R.curry = require("ramda/src/curry")
R.drop = require("ramda/src/drop")
R.dropLast = require("ramda/src/dropLast")
R.join = require("ramda/src/join")
R.last = require("ramda/src/last")
R.merge = require("ramda/src/merge")
R.pipe = require("ramda/src/pipe")
R.replace = require("ramda/src/replace")
R.split = require("ramda/src/split")
let P = require("path")

let ensureDir = (path) => path.endsWith(P.sep) ? path : path + P.sep

let ltrimPath = R.curry((root, path) => R.replace(new RegExp(`^${root}`), "", path))

let rtrimPath = R.replace(new RegExp(`${P.sep}$`), "")

let trimPath = R.curry((root, path) => R.pipe(ltrimPath(root), rtrimPath)(path))

let parse = (path) => {
  let obj = P.parse(path)
  if (path.endsWith(P.sep)) {
    obj.dir = P.join(obj.dir, obj.base)
    obj.base = ""
    obj.name = ""
  }
  obj.dir = ensureDir(obj.dir)
  return obj
}

let format = (obj) => {
  return P.format(R.merge(obj, {dir: rtrimPath(obj.dir)}))
}

let dir = (path) => {
  return path.endsWith(P.sep) ? path : P.dirname(path) + P.sep
}

let base = (path) => {
  return path.endsWith(P.sep) ? "" : P.basename(path)
}

let name = (path) => {
  return withExt("", base(path))
}

let ext = (path) => {
  return withName("", base(path))
}

let leftDir = (path) => {
  let obj = parse(path)
  return R.pipe(
    trimPath(obj.root),
    R.split(P.sep),
    R.head
  )(obj.dir)
}

let rightDir = (path) => {
  let obj = parse(path)
  return R.pipe(
    trimPath(obj.root),
    R.split(P.sep),
    R.last
  )(obj.dir)
}

let addLeftDir = R.curry((leftDir, path) => {
  let obj = parse(path)
  return format({
    dir: obj.root + P.join(leftDir, obj.dir),
    base: obj.base,
  })
})

let addRightDir = R.curry((rightDir, path) => {
  let obj = parse(path)
  return format({
    dir:  P.join(obj.dir, rightDir),
    base: obj.base,
  })
})

let dropLeftDir = (path) => {
  let obj = parse(path)
  let newDir = R.pipe(
    trimPath(obj.root),
    R.split(P.sep),
    R.drop(1),
    R.join(P.sep),
    R.concat(obj.root)
  )(obj.dir)
  return format({
    dir: newDir,
    base: obj.base,
  })
}

let dropRightDir = (path) => {
  let obj = parse(path)
  let newDir = R.pipe(
    trimPath(obj.root),
    R.split(P.sep),
    R.dropLast(1),
    R.join(P.sep),
    R.concat(obj.root)
  )(obj.dir)
  return format({
    dir: newDir,
    base: obj.base,
  })
}

let withLeftDir = R.curry((leftDir, path) => R.pipe(dropLeftDir, addLeftDir(leftDir))(path))

let withRightDir = R.curry((rightDir, path) => R.pipe(dropRightDir, addRightDir(rightDir))(path))

let withDir = R.curry((dir, path) => {
  let obj = parse(path)
  return format({
    dir: obj.root + dir,
    base: obj.base,
  })
})

let withBase = R.curry((base, path) => {
  let obj = parse(path)
  return format({
    dir: obj.dir,
    base,
  })
})

let withName = R.curry((name, path) => {
  let obj = parse(path)
  return format({
    dir: obj.dir,
    base: name + obj.ext,
  })
})

let withExt = R.curry((ext, path) => {
  let obj = parse(path)
  return format({
    dir: obj.dir,
    base: obj.name + ext,
  })
})

let dropBase = withBase("")

let dropExt = withExt("")

exports.ensureDir = ensureDir
exports.ltrimPath = ltrimPath
exports.rtrimPath = rtrimPath
exports.trimPath = trimPath
exports.parse = parse
exports.format = format

exports.dir = dir
exports.base = base
exports.name = name
exports.ext = ext
exports.leftDir = leftDir
exports.rightDir = rightDir

exports.addLeftDir = addLeftDir
exports.addRightDir = addRightDir
exports.dropLeftDir = dropLeftDir
exports.dropRightDir = dropRightDir
exports.dropBase = dropBase
exports.dropExt = dropExt

exports.withDir = withDir
exports.withBase = withBase
exports.withName = withName
exports.withExt = withExt
exports.withLeftDir = withLeftDir
exports.withRightDir = withRightDir

exports.isAbsolute = P.isAbsolute
exports.join = P.join
exports.normalize = P.normalize
exports.relative = P.relative
exports.resolve = P.resolve

/*
Full original API commented:
* delimiter – low-level, import directly
* posix – low-level, import directly
* sep – low-level, import directly
* win32 – low-level, import directly
* basename – wrapped, use P.base instead
* dirname – wrapped, use P.dir instead
* extname – wrapped, use P.ext instead
* format – wrapped, use P helpers instead
* parse – wrapped, use P helpers instead
* isAbsolute – reexported
* join – reexported
* normalize – reexported
* relative – reexported
* resolve – reexported
*/
