import blogModel from "../../model/blogSchema.js"

export const  getmyblogs=async(req,res)=>{
  try{
    
     const blogbyId=await blogModel.find({createdBy:req.user.id})

     return res.status(200).json({
        success:true,
        message:"Blog data fetch successgully",
        data:blogbyId
     })
  }
  catch(err){
    return res.status(500).json({
        success:false,
        message:"failed fetch blog data",
       
     })
  }
}
