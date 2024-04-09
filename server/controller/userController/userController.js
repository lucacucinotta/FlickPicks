const { User } = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const getUserData = async (req, res) => {
  try {
    const username = jwt.verify(req.token, SECRET_KEY).username;
    const user = await User.findOne({ username: username });
    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(500).json({ errMessage: "Internal Server Error." });
  }
};

const getUserLists = async (req, res) => {
  try {
    const username = jwt.verify(req.token, SECRET_KEY).username;
    const user = await User.findOne({ username: username });
    res.status(200).json({
      userLists: {
        watchedList: user.watchedList,
        favoriteList: user.favoriteList,
        watchList: user.watchList,
      },
    });
  } catch (err) {
    res.status(500).json({ errMessage: "Internal Server Error." });
  }
};

const updateMovieList = async (req, res) => {
  try {
    const username = jwt.verify(req.token, SECRET_KEY).username;
    const list = req.params.list;
    const { action, movieID } = req.body;
    if (action === "add") {
      await User.findOneAndUpdate(
        { username: username },
        {
          $push: { [list]: movieID },
        }
      );
      res.status(200).json({ message: "Movie addedd successfully." });
    } else if (action === "remove") {
      await User.findOneAndUpdate(
        { username: username },
        {
          $pull: { [list]: movieID },
        }
      );
      res.status(200).json({ message: "Movie removed successfully." });
    }
  } catch (err) {
    res.status(500).json({ errMessage: "Internal Server Error." });
  }
};

module.exports = { getUserData, getUserLists, updateMovieList };
