const { User } = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const checkMovieID = async (req, res) => {
  try {
    const { movieID } = req.params;
    const username = jwt.verify(req.token, SECRET_KEY).username;
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
    res
      .status(200)
      .json({ isInLists: listTypes.length > 0, listTypes: listTypes });
  } catch (err) {
    res.status(500).json({ errMessage: "Internal Server Error." });
  }
};

module.exports = checkMovieID;
