const mongoose = require("mongoose");
const Joi = require("joi");

const userMongooseSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^(?=.*[A-Za-z])[A-Za-z0-9_-]{4,20}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  password: {
    type: String,
    required: true,
  },
  watchedList: {
    type: Array,
    default: [],
  },
  favoriteList: {
    type: Array,
    default: [],
  },
  watchList: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userMongooseSchema);

const userJoiSchema = Joi.object({
  username: Joi.string()
    .empty()
    .regex(/^(?=.*[A-Za-z])[A-Za-z0-9_-]{4,20}$/)
    .messages({
      "string.empty": "Please enter a username",
      "string.pattern.base": "Invalid username. Please retry",
    }),
  email: Joi.string()
    .empty()
    .regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    .messages({
      "string.empty": "Please enter an email address",
      "string.pattern.base": "Invalid email address. Please retry.",
    }),
  password: Joi.string()
    .empty()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .messages({
      "string.empty": "Please enter a password",
      "string.pattern.base": "Invalid password. Please retry.",
    }),
});

module.exports = { User, userJoiSchema };
