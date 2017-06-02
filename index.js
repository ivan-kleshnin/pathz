// Some hacks until a proper tree shaking comes
let R = {}
R.head = require("ramda/src/head")
R.concat = require("ramda/src/concat")
R.curry = require("ramda/src/curry")
R.drop = require("ramda/src/drop")
R.dropLast = require("ramda/src/dropLast")
R.join = require("ramda/src/join")
R.last = require("ramda/src/last")
R.map = require("ramda/src/map")
R.merge = require("ramda/src/merge")
R.pipe = require("ramda/src/pipe")
R.replace = require("ramda/src/replace")
R.split = require("ramda/src/split")
let P = require("pathz")

RegExp.escape = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

let makeHelpers = (P) => {
  let ensureDir = (path) => path.endsWith(P.sep) ? path : path + P.sep

  let ltrimPath = R.curry((root, path) => R.replace(new RegExp(`^${RegExp.escape(root)}`), "", path))

  let rtrimPath = R.replace(new RegExp(`${RegExp.escape(P.sep)}$`), "")

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
    let newDir = R.pipe(
      trimPath(obj.root),
      (dir) => P.join(leftDir, dir),
      R.concat(obj.root)
    )(obj.dir)
    return format({
      dir: newDir,
      base: obj.base,
    })
  })

  let addRightDir = R.curry((rightDir, path) => {
    let obj = parse(path)
    let newDir = R.pipe(
      trimPath(obj.root),
      (dir) => P.join(dir, rightDir),
      R.concat(obj.root)
    )(obj.dir)
    return format({
      dir: newDir,
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

  let padNumeric = R.curry((w, s) => {
    return isNaN(Number(s))
      ? s
      : s.padStart(w, "0")
  })

  let padName = R.curry((w, s) => R.pipe(R.split("."), R.map(padNumeric(w)), R.join("."))(s))

  let padPath = R.curry((w, s) => R.pipe(R.split(P.sep), R.map(padName(w)), R.join(P.sep))(s))

  return {
    ensureDir,
    ltrimPath,
    rtrimPath,
    trimPath,
    parse,
    format,

    dir,
    base,
    name,
    ext,
    leftDir,
    rightDir,
    addLeftDir,
    addRightDir,
    dropLeftDir,
    dropRightDir,
    dropBase,
    dropExt,

    withDir,
    withBase,
    withName,
    withExt,
    withLeftDir,
    withRightDir,

    isAbsolute: P.isAbsolute,
    join: P.join,
    normalize: P.normalize,
    relative: P.relative,
    resolve: P.resolve,

    padNumeric,
    padName,
    padPath,
  }
}

let helpers = makeHelpers(P)

exports.ensureDir = helpers.ensureDir
exports.ltrimPath = helpers.ltrimPath
exports.rtrimPath = helpers.rtrimPath
exports.trimPath = helpers.trimPath
exports.parse = helpers.parse
exports.format = helpers.format

exports.dir = helpers.dir
exports.base = helpers.base
exports.name = helpers.name
exports.ext = helpers.ext
exports.leftDir = helpers.leftDir
exports.rightDir = helpers.rightDir

exports.addLeftDir = helpers.addLeftDir
exports.addRightDir = helpers.addRightDir
exports.dropLeftDir = helpers.dropLeftDir
exports.dropRightDir = helpers.dropRightDir
exports.dropBase = helpers.dropBase
exports.dropExt = helpers.dropExt

exports.withDir = helpers.withDir
exports.withBase = helpers.withBase
exports.withName = helpers.withName
exports.withExt = helpers.withExt
exports.withLeftDir = helpers.withLeftDir
exports.withRightDir = helpers.withRightDir

exports.isAbsolute = helpers.isAbsolute
exports.join = helpers.join
exports.normalize = helpers.normalize
exports.relative = helpers.relative
exports.resolve = helpers.resolve

exports.padNumeric = helpers.padNumeric
exports.padName = helpers.padName
exports.padPath = helpers.padPath

exports.posix = makeHelpers(P.posix)
exports.win32 = makeHelpers(P.win32)
