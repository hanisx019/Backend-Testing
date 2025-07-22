// const mongoose = require("mongoose");
const Student = require("../models/Student");
const express = require("express");
const router = express.Router();

// const bodyParser = require('body-parser')
// app.use(bodyParser.json())


//post student data
router.post("/", async(req, res) => {
    try {
        const data = req.body
        const studentData =Student(data)
        const response = await studentData.save() 
        console.log("Response Fetched Successfully")
        res.status(200).json(response);        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Server not found'});
    }
});

//get student data
router.get("/", async(req, res) => {
    try {
        const data =await Student.find()
        console.log("Response Fetched Successfully")
        res.status(200).json(data);        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Server not found'});
    }
});

router.put("/:id", async(req, res) => {
    try {
        const studentId = req.params.id
        const updatedStudentData = req.body
        const response = await Student.findByIdAndUpdate(studentId,updatedStudentData,{
            new:true,
            runValidators:true,
        })
        console.log("Data Updated Succesfull")
        res.status(200).json(response);  
        
        if(!response){
            return res.status(404).json({error:"Student not found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Server not found'});
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const studentId = req.params.id
        const response = await Student.findByIdAndDelete(studentId)
        console.log("Data Deleted Succesfull")
        res.status(200).json({message:'Student Data Deleted Succesfully'});  
        
        if(!response){
            return res.status(404).json({error:"Student not found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Server not found'});
    }
});


router.get("/:state", async(req, res) => {
    try {
        const state = req.params.state
        const data = await Student.find({state:state})
        console.log("Response Fetched Successfully")
        res.status(200).json(data);        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Server not found'});
    }
});




module.exports = router
