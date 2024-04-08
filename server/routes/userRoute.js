const express = require("express");
const router = express.Router();
const {
  getUserData,
  getUserLists,
  updateMovieList,
} = require("../controller/userController/userController.js");
const checkToken = require("../middleware/checkToken.js");

router.get("/users/me", checkToken, getUserData);
router.get("/users/me/lists", checkToken, getUserLists);
router.put("/users/me/lists/:list", checkToken, updateMovieList);

module.exports = router;
