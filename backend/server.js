const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/mydb';
mongoose.connect(MONGO_URI)
    .then(()=> console.log("MongoDB connected"))
    .catch(err=> console.log(err));

app.get("/api",(req,res)=>{
    res.json({
        message: "Node backend running",
        database: "MongoDB connected ",
        file: "is changed"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
