import userModel from "../../model/userModel.js"
import bcrypt from 'bcrypt'



export const SignUp=async(req,res)=>{
     try{   
    const{username,email,password}=req.body

        const user=await userModel.findOne({email})
        if(user){
            return res.status(401).json({
                success:false,
                message:"User already exist !! Please Login"
            })
        }

        const newuser=new userModel({username,email,password})
              newuser.password=await bcrypt.hash(password,10)
         await newuser.save();


         return res.status(201).json({
            success:true,
            message:"SignUp Successfully",
            data:newuser
         })
    }

    catch(err){
      
         return res.status(500).json({
            success:false,
            message:"Internal Server problem"
         })
    }
}
