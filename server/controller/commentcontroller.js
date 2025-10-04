const { date } = require('joi');
const commentmodel=require('../model/CommentSchema');
const { default: mongoose } = require('mongoose');


const postcomment=async(req,res)=>{
    try{
       const{userId,blogId,comment}=req.body;

    //    const user=await commentmodel.findOne({userId});
    //     if(!user){
    //      return res.status(401).json({
    //         success:false,
    //         message:"Please login to comment"
    //      })
    //     }

    if(!userId || !blogId || !comment){
          return res.status(400).json({
                success: false,
                message: "userId, blogId, and comment are required"
            }); 
    }

        const newcomment=await commentmodel.create({
            username:userId,
            blogId,
            comment})

        return res.status(201).json({
            success:true,
            message:"Comment Added",
            data:newcomment
        })
    }
    catch(err){
         console.log(err);
           return res.status(500).json({
            success: false,
            message: "Server error while adding comment"
        });
    }
}



const getcommentbyblog=async(req,res)=>{
     const {blogId}=req.params;
    try{
     

      

       const comments = await commentmodel.find({ blogId })
       .populate('username', 'username ')
       .sort({createdAt:-1})


         if (!comments || comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No comments found for this blog"
      });
    }

       return res.status(200).json({
        success:true,
        message:"Comment fetch successfully",
        data:comments
       })
       
    }
    catch(err){
       console.error("Error in getCommentsByBlog:", err);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching comments"
        });
    }
}

module.exports={postcomment,getcommentbyblog};