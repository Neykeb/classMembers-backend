const errorHandler = (err, req, res, next) => {
  // Express erkennt Error-Middlewares zwingend an den 4 Parametern (err, req, res, next)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || "Ein unbekannter Serverfehler ist aufgetreten.",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
