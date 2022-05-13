require('dotenv').config();
const express = require('express');
var cors= require('cors');


const app = express();
app.use(express.json());
const port =5000;
const router=require('./src/Routes/router');

app.use("/app",router);

app.get("/",async(req,res)=>{
  res.json({msg :"hello"});
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  })