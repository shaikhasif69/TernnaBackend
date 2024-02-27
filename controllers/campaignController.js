const dotenv = require("dotenv")

dotenv.config();
const Campaign = require("../models/Campaign")




exports.addCampaign = async function(req, res){
    
    let campaign = new Campaign(req.body)
    await campaign.createCampaign();
    res.status(201).json({message: "campaign added"})
    
}

exports.getCampaign = async function(req,res){
    let campaign = new Campaign()
    let data = await campaign.getCampaign();
    res.status(201).json({data:data})

}