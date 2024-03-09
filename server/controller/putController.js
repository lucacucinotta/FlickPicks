const { User } = require("../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const updateMovieList = async (req, res) => {
  try {
    const token = req.cookies.token;
    const usernmame = jwt.verify(token, SECRET_KEY).username;
    const { action, list } = req.body;
    if (action === "add") {
      await User.findOneAndUpdate(
        { username: usernmame },
        {
          $push: { [list]: req.body.movieID },
        }
      );
    } else if (action === "remove") {
      await User.findOneAndUpdate(
        { username: usernmame },
        {
          $pull: { [list]: req.body.movieID },
        }
      );
    }
    res
      .status(200)
      .json({ message: "Movie operation completed successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMessage: "Internal Server Error." });
  }
};

module.exports = updateMovieList;
