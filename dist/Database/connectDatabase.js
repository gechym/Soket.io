"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.PASSWORD);
const DATABASE_LOCAL = process.env.DATABASE_LOCAL;

_mongoose.default.connect(DATABASE_LOCAL, {
  // v6 not suppot affter config so we use v5.5.2
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con => {
  console.log('DB connection successful !');
}).catch(err => {
  console.log(err);
});