const { validationResult } = require("express-validator");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Abolfal Adhami",
    email: "abolfazl@gmail.coms",
    password: "password123",
  },
  {
    id: "u2",
    name: "Ali Adhami",
    email: "ali@gmail.coms",
    password: "password123",
  },
];

const getUsersHandler = (req, res) => {
  res.json({ data: DUMMY_USERS });
};

const createUserHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new HttpError("Invalid inputes passed , Please check your data", 422);

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);
  if (hasUser) throw new HttpError("Could not create user , Email already exists", 422);
  const salt = await bcrypt.genSalt(10);

  const createdUser = {
    id: uuid.v4(),
    name,
    email,
    password: await bcrypt.hash(password, salt),
  };

  DUMMY_USERS.push(createdUser);

  return res.status(201), json({ message: "User Account Created!", data: createdUser });
};

const loginUserHandler = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser) throw new HttpError("Could not identify user, ", 401);
  if (identifiedUser.password !== password) throw new HttpError("User Password not seem to be wrong", 401);

  res.json({ message: "Logged in!" });
};

module.exports = { createUserHandler, loginUserHandler,getUsersHandler };
