const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controller/postController.js");
const checkToken = require("../controller/getController.js");

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/check-token", checkToken, (req, res) => {
  res.status(200).json({ message: "Success." });
});

module.exports = router;
