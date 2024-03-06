const { User } = require("../models/userSchema");
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

const checkMovieID = async (req, res) => {
  try {
    const { movieID } = req.params;
    console.log(movieID);
    const token = req.cookies.token;
    const username = jwt.verify(token, SECRET_KEY).username;
    const user = await User.findOne({ username: username });
    let listTypes = [];

    if (user.watchedList.includes(movieID)) {
      listTypes.push("watchedList");
    }
    if (user.favoriteList.includes(movieID)) {
      listTypes.push("favoriteList");
    }
    if (user.watchList.includes(movieID)) {
      listTypes.push("watchList");
    }

    if (listTypes.length > 0) {
      res
        .status(200)
        .json({ isInLists: listTypes.length > 0, listTypes: listTypes });
    } else {
      res.status(404).json({ message: "MovieID not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMessage: "Internal Server Error" });
  }
};

module.exports = { checkToken, checkMovieID };
