"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productSchema = new _mongoose.default.Schema({
  title: String,
  price: Number,
  images: Object,
  description: String,
  numReviews: Number,
  rating: Number
}, {
  timestamps: true
});

const _module = _mongoose.default.model('Products', productSchema);

var _default = _module;
exports.default = _default;