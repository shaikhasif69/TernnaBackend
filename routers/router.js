const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const ngoController = require('../controllers/ngoController')
router.post("/user/login", userController.login);
router.post("/user/create-user", userController.addUser);

// NGO  routes
router.post("/ngo/login", ngoController.login);
router.post("/ngo/create-ngo", (req, res) => {
    console.log(req.body,"4erygbuhn"); // Log the request body
    ngoController.addNgo(req, res);
});

router.get("/", (req, res)=>{
    res.send('Hello there! this is our project!')
});
module.exports = router;
