"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const email = async opt => {
  const Transporter = _nodemailer.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP_GOOGLE,
      // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD_GOOGLE // generated ethereal password

    }
  });

  const mailOptions = {
    from: 'nguyenducbao1662002@gmail.com',
    to: opt.to,
    subject: opt.subject,
    text: opt.message
  };
  await Transporter.sendMail(mailOptions);
};

var _default = email;
exports.default = _default;