const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const User = require("../models/User");

exports.RSVPEvent = async function (req, res) {
    console.log(req.body);
    let user = new User(req.body);
    await user.makeRSVP();
    res.status(201).json({ message: "RSVP added" });
  };

