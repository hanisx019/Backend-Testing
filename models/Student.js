const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')
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
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})

studentSchema.pre('save',async function(next){
    const student = this;

    if(!student.isModified('password'))return next()
    
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(student.password,salt)
        student.password=hashedPassword
        next()
    } catch (error) {
        return next(error)
    }
})

studentSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch
    } catch (error) {
        throw error
    }
}

const Student = mongoose.model('Student',studentSchema)
module.exports=Student