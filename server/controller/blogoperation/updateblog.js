import blogModel from "../../model/blogSchema.js"
import cloudinary from '../../database/Cloudinary.js'



export const updateblog=async(req,res)=>{
    const {title,category,description}=req.body
    // console.log(req.body)
    try{
       const blog=await blogModel.findById(req.params.id)

       if(!blog){
         return res.status(401).json({
            success:false,
            message:"Blog does not exist"
         })
       } 

     
  if(req.file){
      
   const {mimetype,buffer}=req.file
        
        if(blog.public_id){
            await cloudinary.uploader.destroy(blog.public_id)
        }
     

     const result=await cloudinary.uploader.upload(`data:${mimetype};base64,${buffer.toString("base64")}`,{
        folder:"blogdata"
      })

      blog.imgurl=result.secure_url,
      blog.public_id=result.public_id
  }

      blog.title=title,
      blog.category=category,
      blog.description=description,
      

      await blog.save()




       return res.status(200).json({
        success:true,
        message:"Blog updated successfully",
        data:blog
       })
    }
    catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
