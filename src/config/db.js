const mongoose = require('mongoose');

const connectDb = ()=>{
    const MONGO_URL = process.env.MONGO_URL;
    mongoose.connect(MONGO_URL,{
  ssl: true, 
  tlsAllowInvalidCertificates: false}).then(() => {console.log("MongoDB connected")  
}).catch(err => console.error("MongoDB connection error:", err));
}

module.exports = connectDb;