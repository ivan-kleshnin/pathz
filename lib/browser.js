"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pathWebpack = _interopRequireDefault(require("path-webpack"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _index.makeHelpers)(_pathWebpack.default);

exports.default = _default;