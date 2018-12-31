"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.makeHelpers = void 0;

var R = _interopRequireWildcard(require("@paqmind/ramdax"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var escape = function escape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

var makeHelpers = function makeHelpers(P) {
  var sep = P.sep || "/";
  var ltrimPath = R.curry(function (root, path) {
    return R.replace(new RegExp("^".concat(escape(root))), "", path);
  });
  var rtrimPath = R.replace(new RegExp("".concat(escape(sep), "$")), "");
  var trimPath = R.curry(function (root, path) {
    return R.pipe(ltrimPath(root), rtrimPath)(path);
  });

  var ensureDir = function ensureDir(path) {
    return path.endsWith(sep) ? path : path + sep;
  };

  var parse = function parse(path) {
    var obj = P.parse(path);

    if (path.endsWith(sep)) {
      obj.dir = P.join(obj.dir, obj.base);
      obj.base = "";
      obj.name = "";
    }

    obj.dir = ensureDir(obj.dir);
    return obj;
  };

  var format = function format(obj) {
    return P.format(R.merge(obj, {
      dir: rtrimPath(obj.dir)
    }));
  };

  var dir = function dir(path) {
    return path.endsWith(sep) ? path : P.dirname(path) + sep;
  };

  var splitDirs = function splitDirs(path) {
    var obj = parse(path);
    return R.split(sep, trimPath(obj.root, obj.dir));
  };

  var base = function base(path) {
    return path.endsWith(sep) ? "" : P.basename(path);
  };

  var name = function name(path) {
    return withExt("", base(path));
  };

  var ext = function ext(path) {
    return withName("", base(path));
  };

  var leftDirs = R.curry(function (n, path) {
    return R.join(sep, R.take(n, splitDirs(path)));
  });
  var leftDir = leftDirs(1);
  var rightDirs = R.curry(function (n, path) {
    return R.join(sep, R.takeLast(n, splitDirs(path)));
  });
  var rightDir = rightDirs(1);
  var addLeftDir = R.curry(function (leftDir, path) {
    var obj = parse(path);
    var newDir = R.pipe(trimPath(obj.root), function (dir) {
      return P.join(leftDir, dir);
    }, R.concat(obj.root))(obj.dir);
    return format({
      dir: newDir,
      base: obj.base
    });
  });
  var addRightDir = R.curry(function (rightDir, path) {
    var obj = parse(path);
    var newDir = R.pipe(trimPath(obj.root), function (dir) {
      return P.join(dir, rightDir);
    }, R.concat(obj.root))(obj.dir);
    return format({
      dir: newDir,
      base: obj.base
    });
  });

  var dropLeftDir = function dropLeftDir(path) {
    var obj = parse(path);
    var newDir = R.pipe(trimPath(obj.root), R.split(sep), R.drop(1), R.join(sep), R.concat(obj.root))(obj.dir);
    return format({
      dir: newDir,
      base: obj.base
    });
  };

  var dropRightDir = function dropRightDir(path) {
    var obj = parse(path);
    var newDir = R.pipe(trimPath(obj.root), R.split(sep), R.dropLast(1), R.join(sep), R.concat(obj.root))(obj.dir);
    return format({
      dir: newDir,
      base: obj.base
    });
  };

  var withLeftDir = R.curry(function (leftDir, path) {
    return R.pipe(dropLeftDir, addLeftDir(leftDir))(path);
  });
  var withRightDir = R.curry(function (rightDir, path) {
    return R.pipe(dropRightDir, addRightDir(rightDir))(path);
  });
  var withDir = R.curry(function (dir, path) {
    var obj = parse(path);
    return format({
      dir: obj.root + dir,
      base: obj.base
    });
  });
  var withBase = R.curry(function (base, path) {
    var obj = parse(path);
    return format({
      dir: obj.dir,
      base: base
    });
  });
  var withName = R.curry(function (name, path) {
    var obj = parse(path);
    return format({
      dir: obj.dir,
      base: name + obj.ext
    });
  });
  var withExt = R.curry(function (ext, path) {
    var obj = parse(path);
    return format({
      dir: obj.dir,
      base: obj.name + ext
    });
  });
  var dropBase = withBase("");
  var dropExt = withExt("");
  var padNumeric = R.curry(function (w, s) {
    return isNaN(Number(s)) ? s : s.padStart(w, "0");
  });
  var padName = R.curry(function (w, s) {
    return R.pipe(R.split("."), R.map(padNumeric(w)), R.join("."))(s);
  });
  var padPath = R.curry(function (w, s) {
    return R.pipe(R.split(sep), R.map(padName(w)), R.join(sep))(s);
  });
  return {
    sep: sep,
    ensureDir: ensureDir,
    ltrimPath: ltrimPath,
    rtrimPath: rtrimPath,
    trimPath: trimPath,
    parse: parse,
    format: format,
    dir: dir,
    splitDirs: splitDirs,
    base: base,
    name: name,
    ext: ext,
    leftDir: leftDir,
    rightDir: rightDir,
    leftDirs: leftDirs,
    rightDirs: rightDirs,
    addLeftDir: addLeftDir,
    addRightDir: addRightDir,
    dropLeftDir: dropLeftDir,
    dropRightDir: dropRightDir,
    dropBase: dropBase,
    dropExt: dropExt,
    withDir: withDir,
    withBase: withBase,
    withName: withName,
    withExt: withExt,
    withLeftDir: withLeftDir,
    withRightDir: withRightDir,
    isAbsolute: P.isAbsolute,
    join: P.join,
    normalize: P.normalize,
    relative: P.relative,
    resolve: P.resolve,
    padNumeric: padNumeric,
    padName: padName,
    padPath: padPath
  };
};

exports.makeHelpers = makeHelpers;

var _default = makeHelpers(_path.default);

exports.default = _default;