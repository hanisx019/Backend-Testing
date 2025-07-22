const express = require("express");
const app = express();
const db=require('./database')
require('dotenv').config();

//
const bodyParser = require('body-parser')
app.use(bodyParser.json())
//

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//import router
const studentRoutes = require('./routes/Student')

//use router
app.use('/student',studentRoutes)

const PORT =process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
