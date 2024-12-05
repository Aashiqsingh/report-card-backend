
const facultySchema = require("../models/facultyModel");
const Encrypt = require("../util/Encrypt");

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
                res.status(200).json({
                    message:"Login Successful",
                    data:facultyDetails
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

module.exports = {
    addFaculty,
    loginFaculty
}