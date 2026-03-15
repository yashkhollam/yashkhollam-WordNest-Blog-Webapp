import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const ConnectMD=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
         console.log("MongoDB Atlas Connected Suceessfully atlas")
        //   console.log("MongoDB  Connected Suceessfully ")  

    }
    catch(err){
        console.log("Failed to Connect the MongoDB")
        console.error(err);
        
    }
   
}

