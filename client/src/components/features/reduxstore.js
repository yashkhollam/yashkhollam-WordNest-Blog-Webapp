import {configureStore} from '@reduxjs/toolkit';
import favoriteblogs from '../features/favouriteblogslice.js'

export  const store=configureStore({
  reducer:{
   favoriteblog:favoriteblogs,
  }  
})