const dotenv = require("dotenv")

dotenv.config();
const Ngo = require("../models/Ngo")

const jwt = require("jsonwebtoken")



exports.login = function(req, res){
    console.log(req.body);
    let ngo = new Ngo(req.body);
    ngo.login().then(function(result){
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            role:result.role, 
            id: result._id
        }
        const token = jwt.sign(data, jwtSecretKey)
        res.json({token:token, role:result.role, id:result._id.toString() })
    }).catch(function(e){
        console.log(e);
    })
}


exports.addNgo = async function(req, res){
    let ngo = new Ngo(req.body);
    let data = await ngo.createNgo();   
    res.status(201).json({message: "ngo added"})
    
}