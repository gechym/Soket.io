"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reviews = exports.getProduct = void 0;

var _product = _interopRequireDefault(require("../module/product"));

var _AppError = _interopRequireDefault(require("../util/AppError"));

var _catchAsync = _interopRequireDefault(require("../util/catchAsync"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getProduct = (0, _catchAsync.default)(async (req, res, next) => {
  const products = await _product.default.find();
  res.status(200).json({
    message: 'success',
    data: {
      products: products
    }
  });
});
exports.getProduct = getProduct;
const reviews = (0, _catchAsync.default)(async (req, res, next) => {
  const {
    rating
  } = req.body;
  const {
    id
  } = req.params;
  if (!rating || rating <= 0 || rating >= 6) return next(new _AppError.default('rating not valid', 404));
  const product = await _product.default.findById(id);
  if (!product) return next(new _AppError.default('product not found', 404));
  await _product.default.findOneAndUpdate({
    _id: id
  }, {
    rating: product.rating + rating,
    numReviews: product.numReviews + 1
  });
  res.status(200).json({
    message: 'success'
  });
});
exports.reviews = reviews;