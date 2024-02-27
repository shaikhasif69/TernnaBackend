const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const Campaign = require("../models/Campaign");

exports.addCampaign = async function (req, res) {
  console.log("hittt");

  console.log(req.files);

  if (req.files) {
    if (req.files.file) {
      let file = req.files.file;
      const fileName = new Date().getTime().toString() + "-" + file.name;
      const savePath = path.join(
        __dirname,
        "../public/",
        "attachments",
        fileName
      );
      await file.mv(savePath);
      req.body.attachment = fileName;
    }
  }
console.log(req.body);
  let campaign = new Campaign(req.body);
  await campaign.createCampaign();
  res.status(201).json({ message: "campaign added" });
};

exports.getAllCampaigns = async function (req, res) {
  let campaign = new Campaign();
  let data = await campaign.getAllCampaigns();
  res.status(201).json({ data: data });
};

exports.getCampaign = async function (req, res) {
  let campaign = new Campaign();
  let data = await campaign.getCampaign();
  res.status(201).json({ data: data });
};

exports.getAllUpcomingCampaigns = async function (req, res) {
  let campagin = new Campaign();
  let data = await campagin.getAllUpcomingCampaigns();
  res.status(201).json({ data: data });
};

exports.getLatest5Campaign = async function (req, res) {
  let campaign = new Campaign();
  let data = await campaign.getLatest5Campaign();
  res.status(201).json({ data: data });
};
