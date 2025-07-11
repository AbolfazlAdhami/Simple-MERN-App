const { check } = require("express-validator");
const { model, models } = require("mongoose");

const validation = {
  postPlace: [check("title").not().isEmpty(), check("description").isLength({ min: 5 }), check("address").not().isEmpty()],
  pathPlace: [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
};

module.exports = validation;
