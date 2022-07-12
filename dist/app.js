"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

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

app.use((0, _cors.default)());
app.options('*', (0, _cors.default)());
app.use(_express.default.json({
  limit: '10kb'
}));
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _cookieParser.default)()); // Bảo mật app

app.use((0, _hpp.default)()); // chặn 2 lần query parama giống nhau vd :  /api/v1/users?sort=price&sort=duration
// MIDDLEWARE

app.use((0, _expressMongoSanitize.default)()); // chặn những mã try vấn đến db từ text của người dùng

app.use((0, _morgan.default)('dev'));
app.use((0, _xssClean.default)()); // chặng người dùng chằn những mã html vs <script/> ...
//1 set security header

app.use((0, _helmet.default)()); //2 limiter request something ip

const limiter = (0, _expressRateLimit.default)({
  // midleware giới hạn các lần gửi req quá nhiều từ một ip nào đó
  max: 100000,
  windowMs: 60 * 60 * 1000,
  // 60 minutes,
  message: 'Too many requests from this ip , please try again in a hour!'
});
app.use('/api/', limiter);
app.use('/api/v1/products', _productRouter.default);
app.use('/api/v1/comments', _commentRouter.default);

if (process.env.NODE_ENV === 'production') {
  app.use(_express.default.static(_path.default.join(__dirname, '../client/build'))); // khai các file¿

  app.use('/', (req, res) => {
    res.sendFile(_path.default.join(__dirname, '../client/build/index.html'));
  });
}

app.use('*', (req, res, next) => {
  return next(new _AppError.default('404', 404));
});
app.use((0, _HandleError.default)());
const httpServer = (0, _http.createServer)(app);
var _default = httpServer;
exports.default = _default;