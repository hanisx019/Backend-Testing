const mongoose = require ('mongoose');
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollno:{
        type:String,
        required:true,
        unique:true
    },
    sem:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    state:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    }
})

const Student = mongoose.model('Student',studentSchema)
module.exports=Student