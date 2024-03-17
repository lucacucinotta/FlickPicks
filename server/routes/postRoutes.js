const express = require("express");
const router = express.Router();
const {
  signUp,
  logIn,
  logOut,
} = require("../controller/postController/postController.js");

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);

module.exports = router;
