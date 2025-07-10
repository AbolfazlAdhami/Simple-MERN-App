const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "" });
});

module.exports = router;
