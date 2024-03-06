const { User } = require("../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const addMovieWatched = async (req, res) => {
  try {
    const token = req.cookies.token;
    const username = jwt.verify(token, SECRET_KEY).username;
    await User.findOneAndUpdate(
      { username: username },
      {
        $push: { watchedList: req.body.movieID },
      }
    );
    res.status(200).json({ message: "Movie added correctly!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMessage: "Internal Server Error" });
  }
};

const removeMovieWatched = async (req, res) => {
  try {
    const token = req.cookies.token;
    const username = jwt.verify(token, SECRET_KEY).username;
    await User.findOneAndUpdate(
      { username: username },
      {
        $pull: { watchedList: req.body.movieID },
      }
    );
    res.status(200).json({ message: "Movie removed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMessage: "Internal Server Error" });
  }
};

const addMovieFavorite = async (req, res) => {
  try {
    const token = req.cookies.token;
    const username = jwt.verify(token, SECRET_KEY).username;
    await User.findOneAndUpdate(
      { username: username },
      {
        $push: { favoriteList: req.body.movieID },
      }
    );
    res.status(200).json({ message: "Movie added correctly!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMessage: "Internal Server Error" });
  }
};

const removeMovieFavorite = async (req, res) => {
  try {
    const token = req.cookies.token;
    const username = jwt.verify(token, SECRET_KEY).username;
    await User.findOneAndUpdate(
      { username: username },
      {
        $pull: { favoriteList: req.body.movieID },
      }
    );
    res.status(200).json({ message: "Movie removed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMessage: "Internal Server Error" });
  }
};

const addMovieToWatch = async (req, res) => {
  try {
    const token = req.cookies.token;
    const username = jwt.verify(token, SECRET_KEY).username;
    await User.findOneAndUpdate(
      { username: username },
      {
        $push: { watchList: req.body.movieID },
      }
    );
    res.status(200).json({ message: "Movie added correctly!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMessage: "Internal Server Error" });
  }
};

const removeMovieToWatch = async (req, res) => {
  try {
    const token = req.cookies.token;
    const username = jwt.verify(token, SECRET_KEY).username;
    await User.findOneAndUpdate(
      { username: username },
      {
        $pull: { watchList: req.body.movieID },
      }
    );
    res.status(200).json({ message: "Movie removed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMessage: "Internal Server Error" });
  }
};

module.exports = {
  addMovieWatched,
  removeMovieWatched,
  addMovieFavorite,
  removeMovieFavorite,
  addMovieToWatch,
  removeMovieToWatch,
};
