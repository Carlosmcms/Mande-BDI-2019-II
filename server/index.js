const express = require("express");
const app = express();
const cors = require("cors");

//Middleware
app.use(cors());


app.listen(5000,()=>{
    console.log("running on 5000");
  }) 