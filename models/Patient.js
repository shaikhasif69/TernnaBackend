const patientCollection = require("../db").collection("patient");

let Patient = function (data) {
  this.data = data;
  this.errors = [];
};
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

Patient.prototype.cleanUp = function () {
  this.data = {
    name: this.data.name,
    email: this.data.email, 
    password: this.data.password, 
    lat:this.data.lat,
    long:this.data.long,
    city:this.data.city,
    state:this.data.state,
    country:this.data.country,
    bloodGroup:this.data.bloodGroup,
    CreatedDate: new Date(),
  };
};

Patient.prototype.createPatient = async function () {
  this.cleanUp();
  await patientCollection.insertOne(this.data);
  return { message: "Patient added successfully." };
};

Patient.prototype.getAllPatient = async function () {
  let data = await patientCollection.find({}).toArray();
  return data;
};


module.exports = Patient;
