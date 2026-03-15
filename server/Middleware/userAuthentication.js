// import jwt from 'jsonwebtoken';

// export const verifyToken=async(req,res,next)=>{
//     try{
//         const authheader=await req.headers['authorization']
//         const token=authheader && authheader.split(' ')[1];

//         if(!token){
//             return res.status(400).json({
//                 success:false,
//                 message:"Unauthorize token or wrong token"
//             })
//         }
        
//         const decoded= jwt.verify(token,process.env.JWTSECRET)
//          req.user=decoded
          

//           next()
       
//     }
   
//     catch(err){
       
//          return res.status(401).json({
//             success:false,
//             message:"Invalid or expired token"
//          }) 
//     }
// }


import jwt from 'jsonwebtoken'

export const userAuthMiddleware=async(req,res,next)=>{
    try{
      
        
        const token=req.cookies?.jwtToken


      
        if(!token){
            return res.status(401).json({
              success:false,
              message:"Please login to continue"
            })
        }

        const decoded= jwt.verify(token,process.env.JWTSECRET)

        

        req.user=decoded

        next()
        }

    catch(err){
        console.log(err)
         return res.status(400).json({
              success:false,
              message:"Invalid token or expired token"
            }) 
    }
}
