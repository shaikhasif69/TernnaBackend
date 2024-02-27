const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/loginUser", userController.login);
router.post("/registerUser", userController.addUser);

const ngoController = require("../controllers/ngoController");
const campaignController = require("../controllers/campaignController");

// NGO  routes
router.post("/ngo/login", ngoController.login);
router.post("/ngo/create-ngo", (req, res) => {
  console.log(req.body, "4erygbuhn"); // Log the request body
  ngoController.addNgo(req, res);
});

// Camapign routes
router.get("/campaign/get-campaign", campaignController.getCampaign);
router.post("/campaign/create-campaign", (req, res) => {
  campaignController.addCampaign(req, res);
});

router.get("/", (req, res) => {
  res.send("Hello there! this is our project!");
});
module.exports = router;
