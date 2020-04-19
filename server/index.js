const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require("cors");
const pool = require("./db");


dotenv.config();
//Middleware
app.use(cors());



const port = process.env.PORT || 5000;
  app.listen(port, () => {
   console.log(`running on ${port}`);
  }); 