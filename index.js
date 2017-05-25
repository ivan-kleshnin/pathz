// Some hacks until a proper tree shaking comes
let R = {}
R.curry = require("ramda/src/curry")
R.drop = require("ramda/src/drop")
R.dropLast = require("ramda/src/dropLast")
R.join = require("ramda/src/join")
R.nth = require("ramda/src/nth")
R.pipe = require("ramda/src/pipe")
R.split = require("ramda/src/split")
let P = require("path")

R.head = R.nth(0)
R.trail = (xs) => R.nth(xs.length - 1, xs)

let parse = (path) => {
  let obj = P.parse(path)
  if (path.endsWith(P.sep)) {
    obj.dir = P.join(obj.dir, obj.base)
    obj.base = ""
  }
  return obj
}

let ensureDir = (path) => path.endsWith(P.sep) ? path : path + P.sep

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
  return R.head(R.split(P.sep, obj.dir))
}

let rightDir = (path) => {
  let obj = parse(path)
  return R.trail(R.split(P.sep, obj.dir))
}

let addLeftDir = R.curry((leftDir, path) => {
  let obj = parse(path)
  return P.format({
    dir: P.join(leftDir, obj.dir),
    base: obj.base,
  })
})

let addRightDir = R.curry((rightDir, path) => {
  let obj = parse(path)
  return P.format({
    dir:  P.join(obj.dir, rightDir),
    base: obj.base,
  })
})

let dropLeftDir = (path) => {
  let obj = parse(path)
  let newDir = R.pipe(R.split(P.sep), R.drop(1), R.join(P.sep))(obj.dir)
  return P.format({
    dir: newDir,
    base: obj.base,
  })
}

let dropRightDir = (path) => {
  let obj = parse(path)
  let newDir = R.pipe(R.split(P.sep), R.dropLast(1), R.join(P.sep))(obj.dir)
  return P.format({
    dir: newDir,
    base: obj.base,
  })
}

let withLeftDir = R.curry((leftDir, path) => R.pipe(dropLeftDir, addLeftDir(leftDir))(path))

let withRightDir = R.curry((rightDir, path) => R.pipe(dropRightDir, addRightDir(rightDir))(path))

let withDir = R.curry((dir, path) => {
  let obj = parse(path)
  return P.format({
    dir,
    base: obj.base,
  })
})

let withBase = R.curry((base, path) => {
  let obj = parse(path)
  return P.format({
    dir: obj.dir,
    base,
  })
})

let withName = R.curry((name, path) => {
  let obj = parse(path)
  return P.format({
    dir: obj.dir,
    name,
    ext: obj.ext,
  })
})

let withExt = R.curry((ext, path) => {
  let obj = parse(path)
  return P.format({
    dir: obj.dir,
    name: obj.name,
    ext,
  })
})

let dropBase = withBase("")

let dropExt = withExt("")

exports.ensureDir = ensureDir
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
