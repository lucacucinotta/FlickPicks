const { User } = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const checkToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ errMessage: "Access denied. Please login." });
  } else {
    jwt.verify(token, SECRET_KEY, (err) => {
      if (err)
        return res
          .status(401)
          .json({ errMessage: "Invalid token. Please login again." });
      next();
    });
  }
};

const checkMovieID = async (req, res) => {
  try {
    const { movieID } = req.params;
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ errMessage: "Token is missing" });
    }
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
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ errMessage: "Invalid token." });
    }
    res.status(500).json({ errMessage: "Internal Server Error." });
  }
};

const getUserData = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ errMessage: "Token is missing" });
    }
    const username = jwt.verify(token, SECRET_KEY).username;
    const user = await User.findOne({ username: username });
    res.status(200).json({ userID: user._id, username: user.username });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ errMessage: "Invalid token." });
    }
    res.status(500).json({ errMessage: "Internal Server Error." });
  }
};

const getUserLists = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ errMessage: "Token is missing" });
    }
    const username = jwt.verify(token, SECRET_KEY).username;
    const user = await User.findOne({ username: username });
    res.status(200).json({
      userLists: {
        watchedList: user.watchedList,
        favoriteList: user.favoriteList,
        watchList: user.watchList,
      },
    });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ errMessage: "Invalid token." });
    }
    res.status(500).json({ errMessage: "Internal Server Error." });
  }
};

module.exports = { checkToken, checkMovieID, getUserData, getUserLists };
