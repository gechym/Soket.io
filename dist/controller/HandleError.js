"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const handleError = () => (err, req, res, next) => {
  console.log(`
/// ┌──────────────────────────────────────────────────────
/// │             APP ERROR LOG                            
/// │      ${err.stack}                                        
/// └──────────────────────────────────────────────────────
    `);
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    message: err.message
  });
};

var _default = handleError;
exports.default = _default;