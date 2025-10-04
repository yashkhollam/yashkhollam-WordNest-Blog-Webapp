const express=require('express')
const dotenv=require('dotenv');
const  route  = require('./routes/blog_route');
const ConnectMD = require('./database/db');
const userroute = require('./routes/userroute');
const cors =require('cors');
const comment = require('./routes/commentroute');

dotenv.config();
ConnectMD();
const app=express()
const PORT=process.env.PORT;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
   res.status(200).json({
    message:"Welcome to the Wordnest Webapp"
   })
})

app.use('/blog',route)
app.use('/auth',userroute)
app.use('/comment',comment)

app.listen(PORT,()=>{
    console.log(`Server run ON PORT =${PORT}`)
})