const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    favorites:[{
           type:mongoose.Schema.Types.ObjectId,
           ref:'blogdata'
    }
       
    ]
})

const userModel=mongoose.model('usermodel',UserSchema)

module.exports=userModel;