const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controller/postController.js");
const { checkToken, checkMovieID } = require("../controller/getController.js");
const {
  addMovieWatched,
  removeMovieWatched,
  addMovieFavorite,
  removeMovieFavorite,
  addMovieToWatch,
  removeMovieToWatch,
} = require("../controller/putController.js");

//POST
router.post("/signup", signUp);
router.post("/login", logIn);

//GET
router.get("/check-token", checkToken, (req, res) => {
  res.status(200).json({ message: "Success." });
});
router.get("/checkMovieID/:movieID", checkMovieID);

//PUT
router.put("/watchedList", addMovieWatched);
router.put("/removeWatchedList", removeMovieWatched);
router.put("/favoriteList", addMovieFavorite);
router.put("/removefavoriteList", removeMovieFavorite);
router.put("/watchList", addMovieToWatch);
router.put("/removeWatchList", removeMovieToWatch);

module.exports = router;
