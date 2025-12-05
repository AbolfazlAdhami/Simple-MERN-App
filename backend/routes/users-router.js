const express = require("express");
const validation = require("../utils/validation");
const router = express.Router();
const { createUserHandler, loginUserHandler, getUsersHandler } = require("../controller/user-controller");

router.get("/", getUsersHandler);

router.post("/signup", validation.signup, createUserHandler);

router.post("/login", loginUserHandler);

module.exports = router;
