const express=require('express')
const route=express.Router()
const { createblog, getallblogs, updateblog, deleteblogbyId, getmyblogs, viewblog, } = require('../controller/blogsController')
const upload=require('../Middleware/imgClodmiddleware');
const verifyToken = require('../Middleware/authantication');


route.get('/getallblogs',getallblogs);
 route.get('/viewblog/:id',viewblog)
route.get('/myblogs',verifyToken,getmyblogs)
route.post('/createblog', verifyToken, upload.single('image'),createblog)
route.patch('/updateblog/:id',upload.single('image'),updateblog)
route.delete('/deleteblog/:id',deleteblogbyId)



module.exports=route;