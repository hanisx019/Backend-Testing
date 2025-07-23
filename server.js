const express = require("express");
const app = express();
const db=require('./database')
require('dotenv').config();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const passport=require('./auth')


//Login User Data
const logRequest=(req,res,next)=>{  
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
}
// app.use(logRequest);
//

//Initialize Passport
app.use(passport.initialize())
const localAuthMiddleware=passport.authenticate('local',{session:false})
//


app.get("/",logRequest,(req, res) => {
  res.send("Hello World!");
});


//import route files
const studentRoutes = require('./routes/Student')

//use route files
app.use('/student',studentRoutes)

const PORT =process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
