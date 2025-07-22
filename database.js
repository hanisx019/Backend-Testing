const mongoose = require('mongoose')
require('dotenv').config();
const mongoURL=process.env.DatabaseURL
mongoose.connect(mongoURL)
const db=mongoose.connection

db.on('connected',()=>{
    console.log("MongoDB Database Connected Succesfully")
})

db.on('disconnected',()=>{
    console.log("MongoDB Database Disconnected")
})
module.exports=db