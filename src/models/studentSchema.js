const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        default:'password'
    },
    faculty:{
        type:Schema.Types.ObjectId,
        ref:'Faculty'
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Student", studentSchema);