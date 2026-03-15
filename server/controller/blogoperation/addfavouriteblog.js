import userModel from "../../model/userModel.js";
import blogModel from "../../model/blogSchema.js";

export const addfavorites=async(req,res)=>{
    try{
         const userId=req.user.id;
        // const {userId}=req.body;
        const blogId=req.params.blogId;

        const user=await userModel.findById(userId);

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Please login"
            })
        }


        if(!user.favorites.includes(blogId)){
            user.favorites.push(blogId)
            await user.save();



            //fetch full blog details

            const blog=await blogModel.findById(blogId);


        return res.status(200).json({
        success:true,
        message:"Liked",
        // data:user.favorites
        data:blog,
       })
        }

     

    }
    catch(err){
        console.log(err)
         return res.status(500).json({
        success:false,
        message:"Internal server problem",
       
       })
    }
}
