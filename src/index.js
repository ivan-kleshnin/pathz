import * as R from "@paqmind/ramda"
import P from "path"

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

  let splitDirs = (path) => {
    let obj = parse(path)
    return R.split(P.sep, trimPath(obj.root, obj.dir))
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

  let leftDirs = R.curry((n, path) => R.join(P.sep, R.take(n, splitDirs(path))))

  let leftDir = leftDirs(1)

  let rightDirs = R.curry((n, path) => R.join(P.sep, R.takeLast(n, splitDirs(path))))

  let rightDir = rightDirs(1)

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
    splitDirs,
    base,
    name,
    ext,
    leftDir,
    rightDir,
    leftDirs,
    rightDirs,
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

export let ensureDir = helpers.ensureDir
export let ltrimPath = helpers.ltrimPath
export let rtrimPath = helpers.rtrimPath
export let trimPath = helpers.trimPath
export let parse = helpers.parse
export let format = helpers.format

export let dir = helpers.dir
export let splitDirs = helpers.splitDirs
export let base = helpers.base
export let name = helpers.name
export let ext = helpers.ext
export let leftDir = helpers.leftDir
export let rightDir = helpers.rightDir
export let leftDirs = helpers.leftDirs
export let rightDirs = helpers.rightDirs

export let addLeftDir = helpers.addLeftDir
export let addRightDir = helpers.addRightDir
export let dropLeftDir = helpers.dropLeftDir
export let dropRightDir = helpers.dropRightDir
export let dropBase = helpers.dropBase
export let dropExt = helpers.dropExt

export let withDir = helpers.withDir
export let withBase = helpers.withBase
export let withName = helpers.withName
export let withExt = helpers.withExt
export let withLeftDir = helpers.withLeftDir
export let withRightDir = helpers.withRightDir

export let isAbsolute = helpers.isAbsolute
export let join = helpers.join
export let normalize = helpers.normalize
export let relative = helpers.relative
export let resolve = helpers.resolve

export let padNumeric = helpers.padNumeric
export let padName = helpers.padName
export let padPath = helpers.padPath

export let posix = makeHelpers(P.posix)
export let win32 = makeHelpers(P.win32)
