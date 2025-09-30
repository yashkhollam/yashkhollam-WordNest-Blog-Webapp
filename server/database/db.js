const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const ConnectMD=async()=>{
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

module.exports=ConnectMD