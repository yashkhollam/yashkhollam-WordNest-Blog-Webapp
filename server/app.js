import express from 'express';
import dotenv from 'dotenv';
import {ConnectMD} from './database/db.js';

import cors from 'cors';

import { userAuthroute } from './routes/userroute.js';
import { blogroute } from './routes/blog_route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
ConnectMD();
const app=express()
const PORT=process.env.PORT;
app.use(cors({
    // origin:"http://localhost:5173",
    origin:"yashkhollam-word-nest-blog-webapp.vercel.app",
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.get('/',(req,res)=>{
   res.status(200).json({
    message:"Welcome to the Wordnest Webapp"
   })
})

app.use('/blog',blogroute)
app.use('/userauth',userAuthroute)
// app.use('/comment',comment)

app.listen(PORT,()=>{
    console.log(`Server run ON PORT =${PORT}`)
})