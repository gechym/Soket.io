"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _helmet = _interopRequireDefault(require("helmet"));

var _expressMongoSanitize = _interopRequireDefault(require("express-mongo-sanitize"));

var _xssClean = _interopRequireDefault(require("xss-clean"));

var _hpp = _interopRequireDefault(require("hpp"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _http = require("http");

var _HandleError = _interopRequireDefault(require("./controller/HandleError"));

var _AppError = _interopRequireDefault(require("./util/AppError"));

var _productRouter = _interopRequireDefault(require("./routes/productRouter"));

var _commentRouter = _interopRequireDefault(require("./routes/commentRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config({
  path: './config.env'
});

const app = (0, _express.default)(); //config

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.HOST_CLIENT}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use((0, _cors.default)());
app.options('*', (0, _cors.default)());
app.use(_express.default.json({
  limit: '10kb'
}));
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(`${__dirname}/public`)); // khai các file
// Bảo mật app

app.use((0, _hpp.default)({
  whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price'] // ngoại lệ

})); // chặn 2 lần query parama giống nhau vd :  /api/v1/users?sort=price&sort=duration
// MIDDLEWARE

app.use((0, _expressMongoSanitize.default)()); // chặn những mã try vấn đến db từ text của người dùng

app.use((0, _morgan.default)('dev'));
app.use((0, _xssClean.default)()); // chặng người dùng chằn những mã html vs <script/> ...
//1 set security header

app.use((0, _helmet.default)());
app.use( // fix error csp //!https://stackoverflow.com/questions/67601708/axios-cdn-link-refused-to-load
_helmet.default.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", 'data:', 'blob:'],
    fontSrc: ["'self'", 'https:', 'data:'],
    scriptSrc: ["'self'", 'unsafe-inline'],
    scriptSrc: ["'self'", 'https://*.cloudflare.com'],
    scriptSrcElem: ["'self'", 'https:', 'https://*.cloudflare.com'],
    styleSrc: ["'self'", 'https:', 'unsafe-inline'],
    connectSrc: ["'self'", 'data', 'https://*.cloudflare.com']
  }
})); //2 limiter request something ip

const limiter = (0, _expressRateLimit.default)({
  // midleware giới hạn các lần gửi req quá nhiều từ một ip nào đó
  max: 100000000000000000000,
  windowMs: 60 * 60 * 1000,
  // 60 minutes,
  message: 'Too many requests from this ip , please try again in a hour!'
});
app.use('/api/', limiter);
app.use('/api/v1/products', _productRouter.default);
app.use('/api/v1/comments', _commentRouter.default);
app.use('*', (req, res, next) => {
  return next(new _AppError.default('404', 404));
});
app.use((0, _HandleError.default)());
const httpServer = (0, _http.createServer)(app);
var _default = httpServer;
exports.default = _default;