import {configureStore} from '@reduxjs/toolkit';
import favoritereducer from '../features/favouriteblogslice.js'

export  const store=configureStore({
  reducer:{
   favoriteblog:favoritereducer,
  }  
})