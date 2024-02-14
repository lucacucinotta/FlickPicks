const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const checkToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ errMessage: "Access denied. Please login." });
  } else {
    jwt.verify(token, SECRET_KEY, (err) => {
      if (err) return console.error(err);
      next();
    });
  }
};

module.exports = checkToken;
