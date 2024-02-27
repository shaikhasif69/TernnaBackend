const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const session = require('express-session');
const cookieParser = require('cookie-parser');
router.post("/loginUser", userController.login);
router.post("/registerUser", userController.addUser);

const ngoController = require("../controllers/ngoController");
const campaignController = require("../controllers/campaignController");
const bloodbankController = require("../controllers/bloodbankController");
router.use(cookieParser());
// NGO  routes
router.post("/ngo/login", ngoController.login);
router.post("/ngo/create-ngo", (req, res) => {
  console.log(req.body, "4erygbuhn"); // Log the request body
  ngoController.addNgo(req, res);
});

// Camapign routes
router.get("/campaign/getAllCampaigns", campaignController.getAllCampaigns);
router.post("/campaign/create-campaign", (req, res) => {
  campaignController.addCampaign(req, res);
});
router.get(
  "/campaign/getAllUpcomingCampaign",
  campaignController.getAllUpcomingCampaigns
);

// Atharva's Work
router.get(
  "/campaign/getLatest5Campaign",
  campaignController.getLatest5Campaign
);
router.get("/users/getAllUsers", userController.getAllUsers);
module.exports = router;



// Bloid Bank routes


router.get("/bloobbank/getAllBloodBank", bloodbankController.getAllBloodBank);
router.post("/campaign/create-blood-bank", (req, res) => {
  bloodbankController.addBloodBank(req, res);
});
router.post("/bloodbank/update-blood-groups", (req, res) => {
  bloodbankController.updateBloodGroups(req, res);
});

router.get("/", (req, res) => {
  res.send("Hello there! this is our project!");
});

