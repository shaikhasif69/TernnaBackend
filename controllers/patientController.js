const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const Patient = require("../models/Patient");

exports.addPatient = async function (req, res) {
  console.log("hittt");

  
console.log(req.body);
  let patient = new Patient(req.body);
  await patient.createPatient();
  res.status(201).json({ message: "patient added" });
};

exports.getAllPatient = async function (req, res) {
  let patient = new Patient();
  let data = await patient.getAllPatient();
  res.status(201).json({ data: data });
};

