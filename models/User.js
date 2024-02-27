const userCollection = require("../db").collection("users")

const { ObjectId } = require("mongodb")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")

let User = function (data) {
    this.data = data;
    this.errors = [];
}



User.prototype.cleanUp = function(){
    this.data = {
        name: this.data.name,
        gender:this.data.gender, 
        email: this.data.email, 
        password: this.data.password, 
        CreatedDate: new Date(),
    }
};

User.prototype.createUser = async function(){
    this.cleanUp();
    const existingUser = await userCollection.findOne({ email: this.data.email });
    if (existingUser) {
        console.log("User with this email already exists. Please use another email.");
        return { message: "User with this email already exists. Please use another email." };
    }
    this.data.password = await bcrypt.hash(this.data.password, 10);
    await userCollection.insertOne(this.data);
    return { message: "User added successfully." };
}

User.prototype.getUser = async function(){
    let data = await userCollection.find({}).toArray();
    return data;
}


User.prototype.login = async function(){
    try {
        console.log(this.data.email);
        this.cleanUp();
        const attemptedUser = await userCollection.findOne({email: this.data.email});

        console.log("Found! the user: ");
        console.log(attemptedUser);

        if(
            attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)
        )
        {
            this.data = attemptedUser
            console.log("This data: ")
            console.log(this.data)

            return attemptedUser;
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


module.exports = User;