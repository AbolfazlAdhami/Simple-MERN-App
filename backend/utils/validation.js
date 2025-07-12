const { check } = require("express-validator");


const validation = {
  postPlace: [check("title").not().isEmpty(), check("description").isLength({ min: 5 }), check("address").not().isEmpty()],
  pathPlace: [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  singup: [check("name").not().isEmpty(), check("email").normalizeEmail().isEmpty(), check("password").isLength({ min: 6 })],
  login: [],
};

module.exports = validation;
