const express = require("express");
const router = express.Router();
const updateMovieList = require("../controller/putController/putController.js");

router.put("/updateMovieList", updateMovieList);

module.exports = router;
