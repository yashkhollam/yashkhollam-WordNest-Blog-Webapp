import userModel from "../../model/userModel.js";

export const removefavorites=async(req,res)=>{
    try{
       const userId=req.user.id;
       const blogId=req.params.blogId;

       const user=await userModel.findById(userId)
                                
        // console.log("from backend",blogId)
        user.favorites=user.favorites.filter((favId)=>favId.toString()!==blogId)

        await user.save();
        await user.populate('favorites')



        return res.status(200).json({
            success:true,
            message:"Unliked",
            data:user.favorites
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Internal server problem",
            
        })
        
    }
}
