const bloodbankCollection = require("../db").collection("bloodbank");

let BloodBank = function (data) {
  this.data = data;
  this.errors = [];
};
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

BloodBank.prototype.cleanUp = function () {
  this.data = {
    name: this.data.name,
    lat: this.data.lat,
    long: this.data.long,
    state: this.data.state,
    city: this.data.city,
    country: this.data.country,
    address: this.data.address,
    aPositive: Number(0),
    aNegative: Number(0),
    bPositive: Number(0),
    bNegative: Number(0),
    abPositive: Number(0),
    abNegative: Number(0),
    oPositive: Number(0),
    oNegative: Number(0),
    CreatedDate: new Date(),
  };
};

BloodBank.prototype.createBloodBank = async function () {
  this.cleanUp();
  await bloodbankCollection.insertOne(this.data);
  return { message: "BloodBank added successfully." };
};

BloodBank.prototype.getAllBloodBank = async function () {
  let data = await bloodbankCollection.find({}).toArray();
  console.log(data)
  return data;
};


BloodBank.prototype.updateBloodGroups = async function (updatedData) {
    this.data = updatedData;
    this.cleanUp();
    
    const filter = { name: this.data.name }; // Assuming 'name' is a unique identifier for each blood bank
    const update = {
      $set: {
        aPositive: this.data.aPositive,
        aNegative: this.data.aNegative,
        bPositive: this.data.bPositive,
        bNegative: this.data.bNegative,
        abPositive: this.data.abPositive,
        abNegative: this.data.abNegative,
        oPositive: this.data.oPositive,
        oNegative: this.data.oNegative,
        CreatedDate: new Date(),
      },
    };
  
    const result = await bloodbankCollection.updateOne(filter, update);
  
    if (result.modifiedCount > 0) {
      return { message: "Blood groups updated successfully." };
    } else {
      return { message: "No matching BloodBank found for update." };
    }
  };

// BloodBank.prototype.getAllUpcomingCampaigns = async function () {
//   let currentDate = new Date();
//   let formattedCurrentDate = formatDate(currentDate);

//   let data = await campaignCollection
//     .find({
//       startDate: { $gte: formattedCurrentDate },
//     })
//     .toArray();

//   let filteredData = data.filter((campaign) => {
//     const startDate = new Date(campaign.startDate);
//     const dateDiff = startDate - currentDate;
//     return dateDiff > 0;
//   });

//   if (filteredData.length > 0) {
//     return filteredData;
//   }

//   return "No Campaigns Found";
// };

// Campaign.prototype.getLatest5Campaign = async function () {
//   let data = await campaignCollection.find({ _id: -1 }).limit(5).toArray();
//   return data;
// };

module.exports = BloodBank;
