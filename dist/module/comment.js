"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commentSchema = new _mongoose.default.Schema({
  username: String,
  content: String,
  product_id: String,
  rating: {
    type: Number,
    default: 0
  },
  reply: Array
}, {
  timestamps: true
});

var _default = _mongoose.default.model('Comments', commentSchema);

exports.default = _default;