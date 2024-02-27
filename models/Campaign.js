const campaignCollection = require("../db").collection("camapign")

let Campaign = function (data) {
    this.data = data;
    this.errors = [];
}



Campaign.prototype.cleanUp = function(){
    this.data = {
        title: this.data.title,
        description: this.data.description, 
        attachment: this.data.attachment, 
        startDate: this.data.startDate, 
        endDate:this.endDate,
        address:this.address,
        lat:this.lat,
        long:this.long,
        participants:this.participants,
        CreatedDate: new Date(),
    }
};

Campaign.prototype.createCampaign = async function(){
    this.cleanUp();
    await campaignCollection.insertOne(this.data);
    return { message: "Campaign added successfully." };
}

Campaign.prototype.getCampaign = async function(){
    let data = await campaignCollection.find({}).toArray();
    return data;
}




module.exports = Campaign;