import userModel from "../../model/userModel.js";


export const getfavoriteblog=async(req,res)=>{
    try{
      const userId=req.user.id;
     //const{userId}=req.params;

      const user=await userModel.findById(userId).populate("favorites")

      if(!user){
        return res.status(401).json({
            success:false,
            message:"User not found"
        })
      }

      return res.status(200).json({
        success:true,
        message:"Favorite fetch",
        data:user.favorites,
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
