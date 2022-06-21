"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComments = void 0;

var _comment = _interopRequireDefault(require("../module/comment"));

var _AppError = _interopRequireDefault(require("../util/AppError"));

var _catchAsync = _interopRequireDefault(require("../util/catchAsync"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const APIfeature = async (resQuery, model) => {
  //Filtering EQ("="), GTE(">="), GT(">"), LT("<"), LTE("<=");
  // /tours?difficulty=easy&duration=5
  const queryObj = _objectSpread({}, resQuery);

  const excludedQuery = ['page', 'sort', 'limit', 'fields'];
  excludedQuery.forEach(el => delete queryObj[el]); // Advanced Filtering
  // /tours?difficulty=easy&duration[gte]=5&price[lt]=1200

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  console.log(JSON.parse(queryStr));
  let query = model.find(JSON.parse(queryStr)); // sort
  ///tours?difficulty=easy&duration[gte]=5&price[lt]=1200&sort=price,-rating

  if (resQuery.sort) {
    const sortBy = resQuery.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('createdAt');
  }

  const countData = (await query).length; // return
  //Limiting Fields
  ///api/v1/tours?fields=-name,-price

  if (resQuery.fields) {
    const fieldsLimit = resQuery.fields.split(',').join(' ');
    console.log(fieldsLimit);
    query = query.select(fieldsLimit);
  } else {
    query = query.select('-__v'); // loại bỏ ko lấy
  } //Better Pagination


  const limit = resQuery.limit * 1 || 5;
  const page = resQuery.page * 1 || 1;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit); // return

  return {
    query,
    countData
  };
};

const getComments = (0, _catchAsync.default)(async (req, res, next) => {
  const {
    query,
    countData
  } = await APIfeature(req.query, _comment.default);
  const comments = await query;
  res.status(200).json({
    message: 'success',
    countData,
    result: comments.length,
    data: {
      comments
    }
  });
});
exports.getComments = getComments;