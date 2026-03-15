import userModel from "../../model/userModel.js"



export const getme=async(req,res)=>{
    try{
  
//   const {id}=req.params

  const user=await userModel.findById(req.user.id)

  if(!user){
    return res.status(404).json({
        success:false,
        message:"user not found"
    })
  }


  return res.status(200).json({
    success:true,
    message:"fetch user succesfully",
    data:{
      id:user._id,
      name:user.username,
      email:user.email,
      
    }
  })

    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({
             success:false,
             message:err.message
        })
    }
}