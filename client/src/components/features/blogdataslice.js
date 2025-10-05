import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
  const apiurl = import.meta.env.VITE_API_URL;


  export const getallblogs=createAsyncThunk('blog/getall',async(rejectWithValue)=>{
    try{
      const response=await axios.get(`${apiurl}/blog/getallblogs`);
      //  console.log(response.data.data)
      return response.data.data;
     
    }
    catch(err){
        console.log(err);
        return rejectWithValue(err.response?.data|| err.message)
    }
})

const blogslice=createSlice({
    name:"blog",
    initialState:{blog:[],loading:false,error:null},
     reducers:{},
     extraReducers:(builder)=>{
        builder.
        addCase(getallblogs.pending,(state)=>{
            state.loading=true
        })

        
        .addCase(getallblogs.fulfilled,(state,action)=>{
            state.loading=false,
            state.blog=(action.payload)
        })

        
        .addCase(getallblogs.rejected,(state,action)=>{
          state.error=action.error.message
        })

        
     }    
})

export default blogslice.reducer;