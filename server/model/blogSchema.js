
import mongoose from 'mongoose'



const BlogSchema=mongoose.Schema({
    title:{
       type:String,
       require:true
    },
    category :{
        type:String,
        
    },
    description :{
       type:String,
        require:true
    },
    author:{
        type:String,
        // require:true
    },
    imgurl:{
        type:String
    },
    public_id:{
        type:String
    },
    
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usermodel"
    },
    
},{
    timestamps:true
})

const blogModel=mongoose.model('blogdata',BlogSchema)

export default blogModel;