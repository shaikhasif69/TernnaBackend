const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/loginUser", userController.login);
router.post("/registerUser", userController.addUser);

router.get("/", (req, res) => {
  res.send("Hello there! this is our project!");
});
module.exports = router;
