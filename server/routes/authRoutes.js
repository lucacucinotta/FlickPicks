const express = require("express");
const router = express.Router();
const {
  signUp,
  logIn,
  logOut,
} = require("../controller/authController/authController.js");
const checkToken = require("../middleware/checkToken");

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.get("/protectedRoute", checkToken, (req, res) => {
  res.status(200).json({ message: "Success." });
});

module.exports = router;
