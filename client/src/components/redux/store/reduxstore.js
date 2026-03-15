import {configureStore} from '@reduxjs/toolkit';
import favouritereducer from '../features/favouriteblogslice.js';
import blogreducer from '../features/blogdataslice.js';
import userAuthSlice from '../features/userAuthSlice.js'

export  const store=configureStore({
  reducer:{
   favouriteblog:favouritereducer,
   blogdata:blogreducer,
   userAuth:userAuthSlice
  }  
})