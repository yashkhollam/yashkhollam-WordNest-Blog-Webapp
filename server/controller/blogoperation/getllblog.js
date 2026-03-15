import blogModel from "../../model/blogSchema.js"



export const getallblogs=async(req,res)=>{
    try{
    const getblog=await blogModel.find()

    return res.status(200).json({
        success:true,
        data:getblog
    })
}

catch(err){
    console.log(err)
     return res.status(500).json({
        success:false,
        message:"Internal server problem"
    })
}
}
