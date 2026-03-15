
import blogModel from "../../model/blogSchema.js";
import cloudinary from 'cloudinary'



export const createblog=async(req,res)=>{
 try{
 
     console.log("the user :",req.user)
   if(!req.file){
    return res.status(401).json({
        success:false,
        message:"Image file is requied"
    })
   }
   
   const {mimetype,buffer}=req.file
    const {title,description,category}=req.body;
    
    
     const result=await cloudinary.uploader.upload(`data:${mimetype};base64,${buffer.toString("base64")}`,{
         folder:"blogdata"
     })
    
   
   


//  const today = new Date();
// const options = { day: 'numeric', month: 'short', year: 'numeric' };
// const formattedDate = today.toLocaleDateString('en-GB', options)

 // 👉 "1/Mar/2025"

    const newblog=await blogModel.create({
        title,
        description,
        author:req.user.username,
        category,
        imgurl:result.secure_url,
        public_id:result.public_id,
        createdBy:req.user.id,
        
    })
    return res.status(201).json({
        success:true,
        message:"Blog posted successffully",
        data:newblog,
        

    })
 }

 catch(err){
    console.log(err)
     return res.status(500).json({
        success:false,
        message:err.message,
        
        
    })
 }

    
}