const { ObjectId } = require("mongodb");

const campaignCollection = require("../db").collection("camapign");

let Campaign = function (data) {
  this.data = data;
  this.errors = [];
};
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
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
    participants: [],
    ngo: this.data.ngoEmail,
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
  let data = await campaignCollection.find({}).limit(5).toArray();
  console.log(data);
  return data;
};

Campaign.prototype.getLatest5UpcomingCampaigns = async function () {
  let currentDate = new Date();
  let formattedCurrentDate = formatDate(currentDate);

  let data = await campaignCollection
    .find({
      startDate: { $gte: formattedCurrentDate },
    })
    .limit(5)
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

Campaign.prototype.registerUserIntoCampaign = async function (
  userId,
  campaignId
) {
  console.log(userId, campaignId);
  // First, Find the campaign
  let campaign = await campaignCollection.findOneAndUpdate(
    {
      _id: new ObjectId(campaignId),
    },
    {
      $push: {
        participants: {
          userId: new ObjectId(userId),
          isDonated: false,
          certificatedRecieved: false,
        },
      },
    }
  );

  return "ok";
};

Campaign.prototype.checkIfAlreadyRegistered = async function (
  userId,
  camapignId
) {
  console.log("this backedn campagin: " + camapignId);
  console.log("user id: " + userId);

  let isPresent = await campaignCollection
    .find({
      _id: new ObjectId(camapignId),
      "participants.userId": new ObjectId(userId),
    })
    .toArray();
  console.log("this is the isPresent array : " + isPresent);
  console.log(isPresent.length);
  if (isPresent.length > 0) {
    return true;
  }

  return false;
};

Campaign.prototype.getRegisteredCampaignsOfUsers = async function (userId) {
  let registeredCampaigns = await campaignCollection
    .aggregate([
      {
        $match: {
          participants: {
            $elemMatch: {
              userId: new ObjectId(userId),
            },
          },
        },
      },
    ])
    .toArray();

  if (registeredCampaigns.length <= 0) {
    return null;
  }

  return registeredCampaigns;
};

Campaign.prototype.getSearchResults = async function (search) {
  const pipelines = [];

  if (search != null || search != undefined) {
    pipelines.unshift({
      $search: {
        index: "searchCampaigns",
        text: {
          query: search,
          // fuzzy: {
          //   maxEdits: 1,
          //   prefixLength: 2,
          //   maxExpansions: 50,
          // },
          fuzzy: {},
          path: {
            wildcard: "title*",
          },
        },
      },
    });
  }
  let campaigns = await campaignCollection.aggregate(pipelines).toArray();

  if (campaigns != null) {
    return campaigns;
  }

  return null;
};

module.exports = Campaign;
