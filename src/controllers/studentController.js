const studentSchema = require('../models/studentSchema');
const multer = require('multer');
const facultySchema = require('../models/facultyModel');
const studentReport = require('../models/studentReport');
const xlsx = require('xlsx');

const storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,file.originalname)
    },
    destination:"./uploads"
})

const upload = multer({
    storage:storage,
}).single("file");

const readDataFromExcell = (file)=>{

    const wb = xlsx.readFile(file);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(ws);
    //console.log(data);
    return data;

}

const createStudentFromExcel = (req,res)=>{
    upload(req,res,async(err)=>{
        if(err){
            res.status(500).json({
                message:"Error in uploading file",
                err:err
            })
        }
        else{
            console.log(req.body)
            const facultyemail = req.body.facultyemail;
            console.log(facultyemail);
            const faculty = await facultySchema.findOne({email:facultyemail})
            console.log(faculty);
            if(!faculty){
                return res.status(404).json({
                    message:"Faculty not found",
                    data:{}
                })
            }
            else{
                const studentData = readDataFromExcell(req.file?.path)
                // console.log(studentData);
            
                const studentDataWithFaculty = studentData.map((stu)=>{
                    return({
                        ...stu,
                        faculty: faculty._id
                    })
                });
                // console.log(studentDataWithFaculty);
                studentDataWithFaculty.forEach(async(stu)=>{
                    const savedStudent = await studentSchema.create(stu);
                    const savedStudentReport = await studentReport.create({
                        student:savedStudent._id,
                        faculty:faculty._id,
                        regularity:stu.regularity,
                        communication:stu.communication,
                        discipline:stu.discipline,
                        testPerformance:stu.testPerformance
                    })
                })
                res.json({
                    message:"File uploaded successfully",
                })
                
            }

            
        }
    })
}

module.exports = {
    createStudentFromExcel
}