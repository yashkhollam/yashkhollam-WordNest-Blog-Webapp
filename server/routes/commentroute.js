const express=require('express');
const {postcomment,getcommentbyblog} = require('../controller/commentcontroller');
const comment=express.Router();

comment.post('/add',postcomment);
comment.get('/get/:blogId',getcommentbyblog)

module.exports=comment;