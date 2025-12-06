const express = require("express");
const validation = require("../utils/validation");
const { createUserHandler, loginUserHandler, getUsersHandler } = require("../controller/user-controller");
const fileUploader = require("../middleware/fileUploader");

const router = express.Router();
router.get("/", getUsersHandler);

router.post("/signup", fileUploader.single('image'),validation.signup, createUserHandler);

router.post("/login", loginUserHandler);

module.exports = router;
