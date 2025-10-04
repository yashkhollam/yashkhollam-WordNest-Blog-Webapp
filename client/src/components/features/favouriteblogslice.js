import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const apiurl=import.meta.env.VITE_API_URL;

export const addfavorite=createAsyncThunk('favorite/add',async({blogId,token})=>{
    try{
       const response=await axios.post(`${apiurl}/blog/addfavorite/${blogId}`,{},{
    headers:{Authorization:`Bearer ${token}`}
  })
  
  console.log(response.data.data)
  return response.data.data;
    }


    catch(err){
       console.log(err);
       throw err;
    }
  
  

})

export const removefavorite=createAsyncThunk('favorite/remove',async({blogId,token})=>{

    try{
       const response=await axios.delete(`${apiurl}/blog/removefavorite/${blogId}`,{
        headers:{Authorization: `Bearer ${token}`}
       })

       console.log(response.data.data);
       return response.data.data

    }
    catch(err){
        console.log(err);
        throw err;
    }

})


const favoriteblogslice=createSlice({
    name:'favorite',
   
    initialState:{favourite:[],loading:false,error:null},
   
    reducers:{},
  
  
    extraReducers:(builder)=>{
        builder
        .addCase(addfavorite.pending,(state)=>{
            state.loading=true
        })
        .addCase(addfavorite.fulfilled,(state,action)=>{
            state.favourite=action.payload;
            state.loading=false;
        })
         .addCase(addfavorite.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })



        //remove favorite

        .addCase(removefavorite.pending,(state)=>{
           state.loading=true
        })

        .addCase(removefavorite.fulfilled,(state,action)=>{
            state.favourite=action.payload;
            state.loading=false;
        })

         .addCase(removefavorite.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})


export default favoriteblogslice.reducer;