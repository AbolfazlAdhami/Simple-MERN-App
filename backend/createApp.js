const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const router = require("./routes");
const HttpError = require("./models/http-error");
const errorHandler = require("./middleware/errorHandler");
const fileErrorHandler = require("./middleware/fileErrorHandler");
const contolHeader = require("./middleware/controlHeaders");
function createApp() {
  const app = express();
  // Built in Middleware
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.json());
  // Routes
  app.use("/api", router);
  app.use("/uploads/images", express.static(path.join("uploads", "images")));
  // Custom Middlware
  app.use(contolHeader);
  app.use((req, res, next) => next(new HttpError("Could not find this route", 404)));
  app.use(fileErrorHandler);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
