const express = require('express')
const app = express();
const mongoose = require('mongoose');


app.use(express.json());


const facultyRoutes = require('./src/routes/facultyRoutes');
app.use("/faculty",facultyRoutes);

const studentRoutes = require('./src/routes/studentRoutes');
app.use('/student',studentRoutes);
// database connection
mongoose.connect('mongodb://127.0.0.1:27017/report-card-app').then(()=>{
    console.log("database connected..");
    
}).catch((err)=>{
    console.log(err);
    
})

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})