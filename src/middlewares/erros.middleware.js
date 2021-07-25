"use strict";
exports.__esModule = true;
exports.errorHandler = exports.notFoundError = void 0;
var notFoundError = function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
};
exports.notFoundError = notFoundError;
var errorHandler = function (err, req, res, next) { return res.status(err.status || err.httpStatus || 500).json({
    message: err.message,
    status: err.status
}); };
exports.errorHandler = errorHandler;
