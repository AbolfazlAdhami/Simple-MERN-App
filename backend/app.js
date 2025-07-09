const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
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

app.get("/", (req, res) => {
  res.json({ message: "" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
