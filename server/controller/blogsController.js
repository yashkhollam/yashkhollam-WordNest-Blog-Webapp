const blogModel = require('../model/blogSchema.js');
const userModel=require('../model/userModel.js')
const cloudinary=require('../database/Cloudinary.js')
const fs=require('fs');
const { trace } = require('console');



const getallblogs=async(req,res)=>{
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


const viewblog =async(req,res)=>{
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


const  getmyblogs=async(req,res)=>{
  try{
    console.log("req.user:",req.user)
     const blogbyId=await blogModel.find({createdBy:req.user.id})

     return res.status(200).json({
        success:true,
        message:"Blog data fetch successgully",
        data:blogbyId
     })
  }
  catch(err){
    return res.status(500).json({
        success:false,
        message:"failed fetch blog data",
       
     })
  }
}



const createblog=async(req,res)=>{
 try{
 
    // console.log("the user :",req.user)
   if(!req.file){
    return res.status(401).json({
        success:false,
        message:"Image file is requied"
    })
   }
   
   const filepath=req.file.path
    const {title,description,author,category}=req.body;
    
    
     const result=await cloudinary.uploader.upload(filepath)
    fs.unlinkSync(filepath)
    // console.log(result)
   
   


 const today = new Date();
const options = { day: 'numeric', month: 'short', year: 'numeric' };
const formattedDate = today.toLocaleDateString('en-GB', options)

console.log(formattedDate); // 👉 "1/Mar/2025"

    const newblog=await blogModel.create({
        title,
        description,
        author,
        category,
        imgurl:result.secure_url,
        public_id:result.public_id,
         createddata:formattedDate,
         createdBy:req.user.id,
        
    })
    return res.status(201).json({
        success:true,
        message:"Blog posted successffully",
        data:newblog,
        

    })
 }

 catch(err){
    console.log(err)
     return res.status(500).json({
        success:false,
        message:err.message,
        
        
    })
 }

    
}

const updateblog=async(req,res)=>{
    const {title,category,description,author,image}=req.body
    console.log(req.body)
    try{
       const blog=await blogModel.findById(req.params.id)

       if(!blog){
         return res.status(401).json({
            success:false,
            message:"Blog does not exist"
         })
       } 

     let filepath;
     let result={};

     if(req.file&&req.file.path){
        filepath=req.file.path;
     
        
        if(blog.public_id){
            await cloudinary.uploader.destroy(blog.public_id)
        }
     

      result=await cloudinary.uploader.upload(filepath)
    }
       const updateblog=await blogModel.findByIdAndUpdate(req.params.id,{
        title,category,description,author,image
       },{new:true})

       const formattedDate=new Date()

       const createddata=formattedDate.toLocaleDateString('en-IN',{
        day:"2-digit",
        month:'short',
        year:"numeric"
       })


       return res.status(200).json({
        success:true,
        message:"Blog updated successfully",
        data:updateblog,
        public_id:result.public_id,
        imgurl:result.secure_url,
        createddata:createddata
       })
    }
    catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// const deleteblogbyId=async(req,res)=>{
//     try{
  

//     const deleteblog=await blogModel.findByIdAndDelete(req.params.id)
//     console.log(deleteblog)
    
//     //     if(deleteblog.public_id){
//     //          await cloudinary.uploader.destroy(req.public_id)
//     // }   

   

//     return res.status(200).json({
//         success:true,
//         message:"Blog deleted successfully",
//         data:deleteblog
//     })

   
//     }
//     catch(err){
//         console.log(err)
//         return res.status(500).json({
//         success:false,
//         message:"Failed to delete the Blog ",
        
//     })
//     }

// }


const deleteblogbyId=async(req,res)=>{
    try{
    
        const existdata=await blogModel.findById(req.params.id);

        
if (!existdata) {
    return res.status(404).json({
        success: false,
        message: "Blog not found",
    });
}

        const {public_id}=existdata
        if(!public_id){
              return res.status(401).json({
            success:false,
            message:"image public_Id is required",
            
        })
        }

        
         await cloudinary.uploader.destroy(public_id)

        const blogdata=await blogModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success:true,
            message:"Blog deleted successfully",
            data:blogdata
        })
        
    }
    catch(err){
        console.log(err)
         return res.status(500).json({
            success:false,
            message:"Failed to deleted teh blog",
           
        })
    }
}


const addfavorites=async(req,res)=>{
    try{
        const userId=req.user.id;
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


        return res.status(200).json({
        success:true,
        message:"add to favorite",
        data:user.favorites
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


const getfavoriteblog=async(req,res)=>{
    try{
      const userId=req.user.id;

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



const removefavorites=async(req,res)=>{
    try{
       const userId=req.user.id;
       const blogId=req.params.blogId;

       const user=await userModel.findById(userId);

        user.favorites=user.favorites.filter((favId)=>favId.toString()!==blogId)

        await user.save();

        return res.status(200).json({
            success:true,
            message:"remove from favorite",
            data:user.favorites
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:true,
            message:"Internal server problem",
            
        })
        
    }
}

module.exports={getallblogs,viewblog,getmyblogs,createblog,updateblog,deleteblogbyId,addfavorites,removefavorites};