// const mongoose = require("mongoose");
const Student = require("../models/Student");
const express = require("express");
const router = express.Router();
const {jwtAuthMiddleware,generateToken}=require('../jwt')
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())


//post student data using signup
router.post("/signup", async(req, res) => {
    try {
        const data = req.body
        const studentData =Student(data)
        const response = await studentData.save() 
        console.log("Response Fetched Successfully")

        const payLoad={
            id:response.id,
            username:response.username
        }
        console.log(JSON.stringify(payLoad))
        const token=generateToken(payLoad)
        console.log("token is:",token)
        res.status(200).json({response:response,token:token});        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Server not found'});
    }
});


//post student data using login
router.post('/login',async (req,res)=>{
    try {
        const{username,password}=req.body
        const user=await Student.findOne({username:username})
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid Username or Password'})
        }
        const payLoad={
            id:user.id,
            username:username
        }
        const token=generateToken(payLoad);
        res.json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try {
        const userData=req.user
        console.log("user Data",userData)
        const userId=userData.id;
        const user=await Student.findById(userId)
        res.status(200).json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'});
    }
})


//get student data
router.get("/", jwtAuthMiddleware,async(req, res) => {
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
