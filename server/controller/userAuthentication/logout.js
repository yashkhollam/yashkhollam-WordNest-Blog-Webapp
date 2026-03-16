


export const Logout=async(req,res)=>{
    try{
        

      res.clearCookie('jwtToken',{
        httpOnly:true,
        
        sameSite:"none",
        secure:true,
      })


      return res.status(200).json({
        success:true,
        message:"Logout successfully"
      })

    }

    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}