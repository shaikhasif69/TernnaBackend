const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/user/login", userController.login);
router.post("/user/create-user", userController.addUser);

router.get("/", (req, res)=>{
    res.send('Hello there! this is our project!')
});
module.exports = router;
