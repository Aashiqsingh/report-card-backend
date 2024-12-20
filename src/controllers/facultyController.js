
const facultySchema = require("../models/facultyModel");
const Encrypt = require("../util/Encrypt");
const jwt = require("jsonwebtoken");
const token = require("../util/token");

const secret = "Aashiq"

const addFaculty = async(req,res) => {
    try{
        req.body.password = await Encrypt.encryptPassword(req.body?.password);
        const newFaculty = await facultySchema.create(req.body);
        if(newFaculty){
            res.status(201).json({
                message:"Faculty Added Successfully",
                data:newFaculty
            })
        } else {
            res.status(404).json({
                message:"Error in adding new faculty",
                data:{}
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            data:err
        })
    }
}

const loginFaculty = async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const facultyDetails = await facultySchema.findOne({email:email});

        if(facultyDetails !== null){
            const isMatch = await Encrypt.comparePassword(password,facultyDetails.password);
            if(isMatch){
                const jwtToken = token.generateToken(facultyDetails.toObject())
                res.status(200).json({
                    message:"Login Successful",
                    // data:facultyDetails
                    jwtToken:jwtToken
                })
            } else {
                res.status(401).json({
                    message:"Invalid Credential"
                })
            }
        } else {
            res.status(404).json({
                message:"Faculty Not Found"
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            data:err
        })
    }
}


const getUserFromToken = (req,res)=>{
    const token = req.headers.authorization
    if(token){
        try{
            const user = jwt.verify(token,secret)
            if(user){
                res.status(200).json({
                    id:user._id,
                })
            }
            else{
                res.status(404).json({
                    message:"User not found.."
                })
            }

        }
        catch(err){
            console.log(err);
            res.status(420).json({
                message:"Invalid token"
            })
            
        }
    }
    else{
        res.status(420).json({
            message:"token is required"
        })
    }
}


module.exports = {
    addFaculty,
    loginFaculty,
    getUserFromToken,
 
}