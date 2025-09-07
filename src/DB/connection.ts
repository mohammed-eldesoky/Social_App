import mongoose from "mongoose";

// connect to MongoDB
export const connectDB = async () => {
  await  mongoose.connect(process.env.DB_URL as string)
  .then(()=>{
    console.log("Connected successfully");
  }).catch(()=>{
    console.log("Connection failed");
  }); 
  //type assertion
}