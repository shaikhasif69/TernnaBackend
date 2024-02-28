const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const rsvpController = require("../controllers/rsvpController");
const session = require('express-session');
const cookieParser = require('cookie-parser');
router.post("/loginUser", userController.login);
router.post("/registerUser", userController.addUser);

const ngoController = require("../controllers/ngoController");
const campaignController = require("../controllers/campaignController");
const bloodbankController = require("../controllers/bloodbankController");
const patientController = require("../controllers/patientController")
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


router.get("/bloodbank/getAllBloodBank", bloodbankController.getAllBloodBank);
router.post("/bloodbank/create-blood-bank", (req, res) => {
  bloodbankController.addBloodBank(req, res);
});
router.post("/bloodbank/update-blood-groups", (req, res) => {
  bloodbankController.updateBloodGroups(req, res);
});




// Patient routes

router.get("/patient/getAllPatient", patientController.getAllPatient);
router.post("/patient/create-patient", (req, res) => {
  patientController.addPatient(req, res);
});



//  Certificate generation
router.post("/rsvp", (req,res)=>{
  rsvpController.RSVPEvent(req,res);
}); //

router.get("/", (req, res) => {
  res.send("Hello there! this is our project!");
});

