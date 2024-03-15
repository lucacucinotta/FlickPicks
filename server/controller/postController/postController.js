const { User, userJoiSchema } = require("../../models/userSchema");
const { MongoError } = require("mongodb");
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
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000 && err.keyValue.username) {
      return res.status(409).json({ errMessage: "Username already in use." });
    } else if (err.code === 11000 && err.keyValue.email) {
      return res.status(409).json({ errMessage: "Email already in use." });
    }
    res.status(500).json({ errMessage: "Internal Server Error." });
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
    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "30d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successfully." });
  } catch (err) {
    res.status(500).json({ errMessage: "Internal Server Error." });
  }
};

module.exports = { signUp, logIn };
