const express = require("express");
const router = express.Router();
const checkMovieID = require("../controller/movieController/movieController.js");
const checkToken = require("../middleware/checkToken.js");

router.get("/movies/:movieID", checkToken, checkMovieID);

module.exports = router;
