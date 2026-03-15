import blogModel from "../../model/blogSchema.js"



export const viewblog =async(req,res)=>{
    try{
    const getblogbyId=await blogModel.findById(req.params.id)

    return res.status(200).json({
        success:true,
        data:getblogbyId
    })
}

catch(err){
     return res.status(500).json({
        success:false,
        message:"Internal server problem"
    })
}
}
