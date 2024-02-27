const ngoCollection = require("../db").collection("ngo")

const { ObjectId } = require("mongodb")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")

let Ngo = function (data) {
    this.data = data;
    this.errors = [];
}



Ngo.prototype.cleanUp = function(){
    this.data = {
        name: this.data.name,
        email: this.data.email, 
        phone: this.data.phone, 
        password: this.data.password, 
        lat:this.lat,
        long:this.long,
        city:this.city,
        state:this.state,
        country:this.country,
        CreatedDate: new Date(),
    }
};

Ngo.prototype.createNgo = async function(){
    this.cleanUp();
    const existingNgo = await ngoCollection.findOne({ email: this.data.email });
    if (existingNgo) {
        console.log("User with this email already exists. Please use another email.");
        return { message: "User with this email already exists. Please use another email." };
    }
    this.data.password = await bcrypt.hash(this.data.password, 10);
    await ngoCollection.insertOne(this.data);
    return { message: "User added successfully." };
}

Ngo.prototype.getNgo = async function(){
    let data = await ngoCollection.find({}).toArray();
    return data;
}


Ngo.prototype.login = async function(){
    try {
        console.log(this.data.email);
        this.cleanUp();
        const attemptedNgo = await ngoCollection.findOne({email: this.data.email});

        console.log("Found! the Ngo: ");
        console.log(attemptedNgo);

        if(
            attemptedNgo && bcrypt.compareSync(this.data.password, attemptedNgo.password)
        )
        {
            this.data = attemptedNgo
            console.log("This data: ")
            console.log(this.data)

            return attemptedNgo;
        }
        else{
            console.log("Invalid")
            throw "Invalid username/password"
        }
    } catch (error) {
        console.log("Failed")
        throw "Please Try again later."
    }
}


module.exports = Ngo;