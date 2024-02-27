const campaignCollection = require("../db").collection("camapign");

let Campaign = function (data) {
  this.data = data;
  this.errors = [];
};
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

Campaign.prototype.cleanUp = function () {
  this.data = {
    title: this.data.title,
    description: this.data.description,
    attachment: this.data.attachment,
    startDate: this.data.startDate,
    endDate: this.data.endDate,
    address: this.data.address,
    lat: this.data.lat,
    long: this.data.long,
    participants: this.data.participants,
    ngo:this.data.ngoEmail,
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
  let formattedCurrentDate = formatDate(currentDate);

  let data = await campaignCollection
    .find({
      startDate: { $gte: formattedCurrentDate },
    })
    .toArray();

  let filteredData = data.filter((campaign) => {
    const startDate = new Date(campaign.startDate);
    const dateDiff = startDate - currentDate;
    return dateDiff > 0;
  });

  if (filteredData.length > 0) {
    return filteredData;
  }

  return "No Campaigns Found";
};

Campaign.prototype.getLatest5Campaign = async function () {
  let data = await campaignCollection.find({ _id: -1 }).limit(5).toArray();
  return data;
};

module.exports = Campaign;
