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
    try {
        let ngo = new Ngo(req.body);
        let data = await ngo.createNgo();

        // Store user data in the session
        req.session.ngoId = data._id;
        req.session.ngoEmail = data.email;
        req.session.ngoName = data.name;

        res.redirect('http://localhost:3000/');
    } catch (error) {
        console.error('Error adding NGO:', error.message);
        res.status(500).send('Internal Server Error');
    }
    
}