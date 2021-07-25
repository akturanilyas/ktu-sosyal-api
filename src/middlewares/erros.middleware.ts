export const notFoundError = (req, res, next) => {
  const err: any = new Error('Not Found');

  err.status = 404;
  next(err);
};

export const errorHandler = (err, req, res, next) => res.status(err.status || err.httpStatus || 500).json({
  message: err.message,
  status: err.status,
});
