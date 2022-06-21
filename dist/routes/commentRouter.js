"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _commentController = require("../controller/commentController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commentRouter = _express.default.Router();

commentRouter.route('/:id').get(_commentController.getComments);
var _default = commentRouter;
exports.default = _default;