const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controller/postController.js");
const { checkToken, checkMovieID } = require("../controller/getController.js");
const updateMovieList = require("../controller/putController.js");

//POST
router.post("/signup", signUp);
router.post("/login", logIn);

//GET
router.get("/check-token", checkToken, (req, res) => {
  res.status(200).json({ message: "Success." });
});
router.get("/checkMovieID/:movieID", checkMovieID);

//PUT
router.put("/updateMovieList", updateMovieList);

module.exports = router;
