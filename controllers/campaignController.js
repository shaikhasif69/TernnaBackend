const dotenv = require("dotenv");

dotenv.config();
const Campaign = require("../models/Campaign");

exports.addCampaign = async function (req, res) {
  if (req.files) {
    if (req.files.file) {
      if (!Array.isArray(req.files)) {
        let file = req.files.file;
        const fileName = new Date().getTime().toString() + "-" + file.name;
        const savePath = path.join(
          __dirname,
          "../public/",
          "attachments",
          fileName
        );
        await file.mv(savePath);
        req.body.attachment = file;
      }
    }
  }

  let campaign = new Campaign(req.body);
  await campaign.createCampaign();
  res.status(201).json({ message: "campaign added" });
};

exports.getAllCampaigns = async function (req, res) {
  let campaign = new Campaign();
  let data = await campaign.getAllCampaigns();
  res.status(201).json({ data: data });
};

exports.getAllUpcomingCampaigns = async function (req, res) {
  let campagin = new Campaign();
  let data = await campagin.getAllUpcomingCampaigns();
  res.status(201).json({ data: data });
};

exports.getCampaign = async function (req, res) {
  let campaign = new Campaign();
  let data = await campaign.getCampaign();
  res.status(201).json({ data: data });
};
