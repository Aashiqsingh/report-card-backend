const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentReport = new Schema({
    student:{
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    faculty:{
        type:Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    regularity:{
        type:Number
    },
    communication:{
        type:Number
    },
    discipline:{
        type:Number
    },
    testPerFormance:{
        type:Number
    },
},{
    timestamps:true,
})

module.exports = mongoose.model('StudentReport',studentReport)