const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const facultySchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Faculty', facultySchema);