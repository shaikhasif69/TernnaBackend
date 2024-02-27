const dotenv = require("dotenv")

dotenv.config();
const Campaign = require("../models/Campaign")
const multer = require("multer");
const cloudinary = require("cloudinary").v2;



cloudinary.config({ 
  cloud_name: 'dnc1upcst', 
  api_key: '633563578211566', 
  api_secret: 'OkAmAAbu_aZJAR0MASnstX0kigg' 
});
// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.addCampaign = async function (req, res) {
  try {
    // Check if there is a file in the request
    if (!req.files) {
      return res.status(400).json({ message: "Please upload an image file" });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.files.buffer, {
      folder: "campaigns" // Specify the folder in Cloudinary
    });
console.log(result);
    // Create a Campaign with the image URL
    let campaign = new Campaign({
      ...req.body,
      attachment: result.secure_url
    });

    await campaign.createCampaign();
    res.status(201).json({ message: "Campaign added", imageUrl: result.secure_url });
  } catch (error) {
    console.error("Error adding campaign:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getCampaign = async function(req,res){
    let campaign = new Campaign()
    let data = await campaign.getCampaign();
    res.status(201).json({data:data})

}