const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const BloodBank = require("../models/BloodBank");

exports.addBloodBank = async function (req, res) {

console.log(req.body);
  let bloodbank = new BloodBank(req.body);
  await bloodbank.createBloodBank();
  res.status(201).json({ message: "BloodBank added" });
};

exports.getAllBloodBank = async function (req, res) {
  let bloodbank = new BloodBank();
  let data = await bloodbank.getAllBloodBank();
  res.status(201).json({ data: data });
};
exports.updateBloodGroups = async function (req, res) {
    try {
      const updatedData = req.body;
      let bloodbank = new BloodBank();
      const result = await bloodbank.updateBloodGroups(updatedData);
      
      if (result.message.includes("updated successfully")) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
// exports.getCampaign = async function (req, res) {
//   let campaign = new Campaign();
//   let data = await campaign.getCampaign();
//   res.status(201).json({ data: data });
// };

// exports.getAllUpcomingCampaigns = async function (req, res) {
//   let campagin = new Campaign();
//   let data = await campagin.getAllUpcomingCampaigns();
//   res.status(201).json({ data: data });
// };

// exports.getLatest5Campaign = async function (req, res) {
//   let campaign = new Campaign();
//   let data = await campaign.getLatest5Campaign();
//   res.status(201).json({ data: data });
// };
