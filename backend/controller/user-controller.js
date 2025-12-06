const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const HttpError = require("../models/http-error");


const getUsersHandler = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return next(new HttpError("Fetching users failed ,please try again later.", 500));
  }

  res.json({ users: users.map((user) => user.toObject({ getter: true })) });
};

const createUserHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError("Invalid inputs passed , Please check your data", 422));

  const { name, email, password } = req.body;

  try {
    const hasUser = await User.findOne({ email });

    if (hasUser) throw new HttpError("Could not create user , Email already exists", 422);

    const salt = await bcrypt.genSalt(10);

    const createdUser = new User({
      name,
      email,
      image: req.file.path,
      password: await bcrypt.hash(password, salt),
      places: [],
    });

    await createdUser.save();
    const token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, "supersecret_dont_share", { expiresIn: "1h" });

    return res.status(201), json({ message: "User Account Created!", data: createdUser, token });
  } catch (err) {
    return new HttpError("Could not create user, please try again.", 500);
  }
};

const loginUserHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new HttpError("Could not identify user, ", 401);

    let isValidPassword = false;

    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (error) {
      return next(new HttpError("Could not log you in, please check your credentials and try again.", 500));
    }

    if (!isValidPassword) throw new HttpError("Invalid password, could not log you in.", 401);

    let token;
    try {
      token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, "supersecret_dont_share", { expiresIn: "1h" });
    } catch (error) {
      return next(new HttpError("Logging in failed, please try again later.", 500));
    }


    return res.json({ userId: existingUser.id, email: existingUser.email, token });
  } catch (error) {
    return next(new HttpError("Logging in failed, please try again later.", 500));
  }
};

module.exports = { createUserHandler, loginUserHandler, getUsersHandler };
