const { User, userJoiSchema } = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const signUp = async (req, res) => {
  try {
    const { password } = req.body;
    const { error } = userJoiSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((error) => error.message);
      return res.status(422).json({ errMessages: errorMessages });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      const fieldError = Object.keys(err.keyValue)[0];
      if (fieldError === "username") {
        return res.status(409).json({ errMessage: "Username already in use" });
      } else {
        return res.status(409).json({ errMessage: "Email already in use" });
      }
    }
    res.status(500).json({ errMessage: err.message });
  }
};

const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({
        errMessage: "The username you entered is not linked to any account.",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ errMessage: "The password you entered is not correct." });
    }
    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    res.cookie("token", token);
    res.status(200).json({ message: "Log in successfully" });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports = { signUp, logIn };
