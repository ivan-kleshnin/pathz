let {basename, dirname, format, join: joinp, parse, resolve, sep} = require("path")
let {curry, drop, dropLast, head, join, map, pipe, split} = require("./_helpers")

let trail = (xs) => head(drop(xs.length - 1, xs))

let parsep = (path) => {
  let obj = parse(path)
  if (path.endsWith("/")) {
    obj.dir = joinp(obj.dir, obj.base)
    obj.base = ""
  }
  return obj
}

let dir = dirname

let base = basename

let name = (path) => {
  return withExt("", base(path))
}

let ext = (path) => {
  return withName("", base(path))
}

let leftDir = (path) => {
  let obj = parsep(path)
  return head(split(sep, obj.dir))
}

let rightDir = (path) => {
  let obj = parsep(path)
  return trail(split(sep, obj.dir))
}

let addLeftDir = curry((leftDir, path) => {
  let obj = parsep(path)
  return format({
    dir: joinp(leftDir, obj.dir),
    base: obj.base,
  })
})

let addRightDir = curry((rightDir, path) => {
  let obj = parsep(path)
  return format({
    dir:  joinp(obj.dir, rightDir),
    base: obj.base,
  })
})

let dropLeftDir = (path) => {
  let obj = parsep(path)
  let newDir = pipe(split(sep), drop(1), join(sep))(obj.dir)
  return format({
    dir: newDir,
    base: obj.base,
  })
}

let dropRightDir = (path) => {
  let obj = parsep(path)
  let newDir = pipe(split(sep), dropLast(1), join(sep))(obj.dir)
  return format({
    dir: newDir,
    base: obj.base,
  })
}

let withLeftDir = curry((leftDir, path) => pipe(dropLeftDir, addLeftDir(leftDir))(path))

let withRightDir = curry((rightDir, path) => pipe(dropRightDir, addRightDir(rightDir))(path))

let withDir = curry((dir, path) => {
  let obj = parsep(path)
  return format({
    dir,
    base: obj.base,
  })
})

let withBase = curry((base, path) => {
  let obj = parsep(path)
  return format({
    dir: obj.dir,
    base,
  })
})

let withName = curry((name, path) => {
  let obj = parsep(path)
  return format({
    dir: obj.dir,
    name,
    ext: obj.ext,
  })
})

let withExt = curry((ext, path) => {
  let obj = parsep(path)
  return format({
    dir: obj.dir,
    name: obj.name,
    ext,
  })
})

let dropBase = withBase("")

let dropExt = withExt("")

let pad = curry((z, w, s) => {
  return (z.repeat(w) + s).slice(s.length)
})

let padNumeric = curry((w, s) => {
  let n = Number(s)
  if (isNaN(n)) {
    return s
  } else {
    return pad("0", w, s)
  }
})

let padName = curry((w, s) => pipe(split("."), map(padNumeric(w)), join("."))(s))

let padPath = curry((w, s) => pipe(split(sep), map(padName(w)), join(sep))(s))

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

exports.pad = pad
exports.padNumeric = padNumeric
exports.padName = padName
exports.padPath = padPath
