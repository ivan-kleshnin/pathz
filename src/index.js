import * as R from "@paqmind/ramda"
import P from "path"

let escape = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

export let makeHelpers = (P) => {
  let ltrimPath = R.curry((root, path) => R.replace(new RegExp(`^${escape(root)}`), "", path))

  let rtrimPath = R.replace(new RegExp(`${escape(P.sep)}$`), "")

  let trimPath = R.curry((root, path) => R.pipe(ltrimPath(root), rtrimPath)(path))

  let ensureDir = (path) => path.endsWith(P.sep) ? path : path + P.sep

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

export default makeHelpers(P)
