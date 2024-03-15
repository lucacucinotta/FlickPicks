const { User } = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const updateMovieList = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ errMessage: "Token is missing" });
    }
    const username = jwt.verify(token, SECRET_KEY).username;
    const { action, list } = req.body;
    if (action === "add") {
      await User.findOneAndUpdate(
        { username: username },
        {
          $push: { [list]: req.body.movieID },
        }
      );
      res.status(200).json({ message: "Movie addedd successfully." });
    } else if (action === "remove") {
      await User.findOneAndUpdate(
        { username: username },
        {
          $pull: { [list]: req.body.movieID },
        }
      );
      res.status(200).json({ message: "Movie removed successfully." });
    }
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ errMessage: "Invalid token." });
    }
    res.status(500).json({ errMessage: "Internal Server Error." });
  }
};

module.exports = updateMovieList;
