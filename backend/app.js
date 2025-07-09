const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const app = express();
const PORT = process.env.PORT || 5000;
//
const usersRoutes = require("./routes/users-router");
const placesRoutes = require("./routes/users-router");

// Built in Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
