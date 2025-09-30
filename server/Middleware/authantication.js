const jwt=require('jsonwebtoken')

const verifyToken=async(req,res,next)=>{
    try{
        const authheader=await req.headers['authorization']
        const token=authheader && authheader.split(' ')[1];

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Unauthorize token or wrong token"
            })
        }
        
        const decoded= jwt.verify(token,process.env.JWTSECRET)
         req.user=decoded
          

          next()
       
    }
   
    catch(err){
       
         return res.status(401).json({
            success:false,
            message:"Inalid or expired token"
         }) 
    }
}

module.exports=verifyToken