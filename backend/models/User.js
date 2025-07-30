const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema, Types } = mongoose


const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, minlength: 6 },
  image: { type: String, require: true },
  places: [{ type: Types.ObjectId, require: true, ref: "Place" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
