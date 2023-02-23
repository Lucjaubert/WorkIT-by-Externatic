/* eslint-disable no-unused-vars */

const errorMiddleware = (err, req, res, next) => {
  console.warn(err);
  res
    .status(500)
    .json({ message: "500 internal server error", error: err.message });
};

module.exports = errorMiddleware;
