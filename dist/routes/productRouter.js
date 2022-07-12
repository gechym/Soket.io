"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _productControler = require("../controller/productControler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productRouter = _express.default.Router();

productRouter.route('/').get(_productControler.getProduct);
productRouter.route('/:id').patch(_productControler.reviews);
var _default = productRouter;
exports.default = _default;