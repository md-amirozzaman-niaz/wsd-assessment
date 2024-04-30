const jwt = require("jsonwebtoken");
const log = console.log;

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}
function logging(err, req, res) {
  // const {authorization,...rest} = req.headers;
  // console.table([{...rest}])
  console.table([
    {
      method: req.method,
      path: req.path,
      params: req.params,
      query: req.query,
      status: res.statusCode,
      body: req.body,
    },
  ]);
  log(err.stack);
}
/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  // when prisma throw error with an ID of non existing
  // findOrThrowError method name of prisma
  if (err.code == "P2025") {
    statusCode = 404;
  }
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
  logging(err, req, res);
}

function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error("🚫 Un-Authorized 🚫");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log(payload);
    req.payload = payload;
  } catch (err) {
    res.status(401);
    if (err.name === "TokenExpiredError") {
      throw new Error(err.name);
    }
    throw new Error("🚫 Un-Authorized 🚫");
  }

  return next();
}

module.exports = {
  notFound,
  errorHandler,
  isAuthenticated,
};
