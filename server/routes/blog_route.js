import { Router } from 'express';
import upload from '../Middleware/imgClodmiddleware.js';
import {userAuthMiddleware} from  '../Middleware/userAuthentication.js';

export const blogroute=Router()

import { getallblogs } from '../controller/blogoperation/getllblog.js';
import { getmyblogs } from '../controller/blogoperation/getmyblog.js';
import { viewblog } from '../controller/blogoperation/viewblog.js'
import { createblog } from '../controller/blogoperation/createblog.js';
import { updateblog } from '../controller/blogoperation/updateblog.js';
import { deleteblogbyId } from '../controller/blogoperation/deleteblog.js';
import { addfavorites } from '../controller/blogoperation/addfavouriteblog.js';
import { getfavoriteblog } from '../controller/blogoperation/getfavouriteblog.js';
import { removefavorites } from '../controller/blogoperation/removefavouriteblog.js';
// import { getmyblogs } from '../controller/blogoperation/getmyblog.js';



blogroute.get('/getallblogs',getallblogs);
 blogroute.get('/viewblog/:id',viewblog)
blogroute.get('/myblogs',userAuthMiddleware,getmyblogs)
blogroute.post('/createblog', upload.single('image'),userAuthMiddleware,createblog)
 blogroute.patch('/updateblog/:id',upload.single('image'),updateblog)
blogroute.delete('/deleteblog/:id',deleteblogbyId)

blogroute.post('/addfavourite/:blogId',userAuthMiddleware,addfavorites);
blogroute.get('/getfavouriteblog',userAuthMiddleware,getfavoriteblog)
blogroute.delete('/removefavourite/:blogId',userAuthMiddleware,removefavorites);


