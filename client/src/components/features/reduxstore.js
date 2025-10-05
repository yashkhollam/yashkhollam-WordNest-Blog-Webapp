import {configureStore} from '@reduxjs/toolkit';
import favoritereducer from '../features/favouriteblogslice.js';
import blogreducer from '../features/blogdataslice.js';

export  const store=configureStore({
  reducer:{
   favoriteblog:favoritereducer,
   blogdata:blogreducer
  }  
})