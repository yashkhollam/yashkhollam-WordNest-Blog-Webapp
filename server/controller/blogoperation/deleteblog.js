import blogModel from "../../model/blogSchema.js";
import cloudinary from "../../database/Cloudinary.js";


export const deleteblogbyId=async(req,res)=>{
    try{
    
        const existdata=await blogModel.findById(req.params.id);

        
if (!existdata) {
    return res.status(404).json({
        success: false,
        message: "Blog not found",
    });
}

        const {public_id}=existdata
        
        

        
         await cloudinary.uploader.destroy(public_id)

        const blogdata=await blogModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success:true,
            message:"Blog deleted successfully",
            data:{
                id:blogdata._id
            }
        })
        
    }
    catch(err){
        console.log(err)
         return res.status(500).json({
            success:false,
            message:"Failed to deleted teh blog",
           
        })
    }
}

