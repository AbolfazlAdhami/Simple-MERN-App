const express = require("express");
const validation = require("../utils/validation");
const { validationResult } = require("express-validator");
const router = express.Router();

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Abolfal Adhami",
    email: "abolfazl@gmail.coms",
    password: "password123",
  },
];

router.get("/", (req, res, next) => {
  res.json({ message: "" });
});

router.post("/signup", validation.singup, (req, res, next) => {});

router.post("/login", (req, res, next) => {});

module.exports = router;
