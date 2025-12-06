const { unlink } = require("fs");

const fileErrorHandler = (error, req, res, next) => {
  if (req.file) return unlink(req.file.path, (err) => console.error(err));
  if (res.headerSent) return next(error);

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
};

module.exports = fileErrorHandler;
