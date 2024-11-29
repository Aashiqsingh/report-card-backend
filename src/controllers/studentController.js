const studentSchema = require('../models/studentSchema');
const multer = require('multer');
const xlsx = require('xlsx');

const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
    destination:"./uploads"
})

const upload = multer({
    storage:storage,
}).single("file");

const readDataFromExcel = (file)=>{
    const wb = xlsx.readFile(file);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = xlsx.utils.sheet_to_join(ws);


    return data;
}

const createStudentFromExcel = (req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.status(500).json({
                message:"Error in uploading file",
                err:err
            })
        }
        else{
            const studentData = readDataFromExcel(req.file.path)
            console.log(studentData);
            
            res.json({
                message:"File uploaded successfully",
                data:studentData
            })
        }
    })
}

module.exports = {
    createStudentFromExcel
}