const userCollection = require("../db").collection("users");

const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function () {
  this.data = {
    userEmail: this.data.userEmail,
    userPhone: this.data.userPhone,
    userPassword: this.data.userPassword,
    createdAt: new Date(),
  };
};

User.prototype.createUser = async function () {
  this.cleanUp();
  const existingUser = await userCollection.findOne({
    userEmail: this.data.userEmail,
  });
  if (existingUser) {
    return "User with this email already exists. Please use another email.";
  }
  this.data.userPassword = await bcrypt.hash(this.data.userPassword, 10);
  let data = await userCollection.insertOne(this.data);

  if (data.acknowledged) {
    return "ok";
  }

  return "fail";
};

User.prototype.login = async function () {
  try {
    console.log(this.data.userEmail);
    this.cleanUp();
    const attemptedUser = await userCollection.findOne({
      userEmail: this.data.userEmail,
    });

    console.log("Found! the user: ");
    console.log(attemptedUser);

    if (
      attemptedUser &&
      bcrypt.compareSync(this.data.userPassword, attemptedUser.userPassword)
    ) {
      this.data = attemptedUser;
      console.log("This data: ");
      console.log(this.data);

      return attemptedUser;
    } else {
      console.log("Invalid");
      return "fail";
    }
  } catch (error) {
    console.log("Failed");
    return "Please Try again later.";
  }
};

User.prototype.getUser = async function () {
  let data = await userCollection.find({}).toArray();
  return data;
};

module.exports = User;
