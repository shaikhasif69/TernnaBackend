const campaignCollection = require("../db").collection("camapign");

let Campaign = function (data) {
  this.data = data;
  this.errors = [];
};

Campaign.prototype.cleanUp = function () {
  this.data = {
    title: this.data.title,
    description: this.data.description,
    attachment: this.data.attachment,
    startDate: this.data.startDate,
    endDate: this.endDate,
    address: this.address,
    lat: this.lat,
    long: this.long,
    participants: this.participants,
    CreatedDate: new Date(),
  };
};

Campaign.prototype.createCampaign = async function () {
  this.cleanUp();
  await campaignCollection.insertOne(this.data);
  return { message: "Campaign added successfully." };
};

Campaign.prototype.getAllCampaigns = async function () {
  let data = await campaignCollection.find({}).toArray();
  return data;
};

Campaign.prototype.getAllUpcomingCampaigns = async function () {
  let currentDate = new Date();

  let data = await campaignCollection
    .find({
      startDate: { $gte: currentDate },
    })
    .toArray();

  if (data.length > 0) {
    return data;
  }

  return "No Campaigns Found";
};

module.exports = Campaign;
