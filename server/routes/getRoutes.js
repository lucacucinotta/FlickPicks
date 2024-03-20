const express = require("express");
const router = express.Router();
const {
  checkToken,
  checkMovieID,
  getUserData,
  getUserLists,
} = require("../controller/getController/getController.js");

router.get("/checkToken", checkToken, (req, res) => {
  res.status(200).json({ message: "Success." });
});
router.get("/checkMovieID/:movieID", checkMovieID);
router.get("/getUserData", getUserData);
router.get("/getUserLists", getUserLists);

module.exports = router;
