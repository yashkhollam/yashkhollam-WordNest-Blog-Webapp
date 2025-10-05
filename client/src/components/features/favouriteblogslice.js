import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const apiurl=import.meta.env.VITE_API_URL;

export const addfavorite=createAsyncThunk('favorite/add',async({blogId,token},{rejectWithValue})=>{
    try{
       const response=await axios.post(`${apiurl}/blog/addfavorite/${blogId}`,{},{
    headers:{Authorization:`Bearer ${token}`}
  })
  
  console.log(response.data,"from slice")
   return response.data.data;
    }


    catch (err) {
      console.log("Error in addfavorite:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
})


export const getfavouriteblog=createAsyncThunk('favorite/getblog',async({userId,token})=>{
    try{
       const response=await axios.get(`${apiurl}/blog/getfavoriteblog/${userId}`,
        {
             headers:{Authorization:`Bearer ${token}`}
    
    })
     
     return response.data.data;
   
}


    catch(err){
        console.log(err.response.message || err)
    }
})








export const removefavorite=createAsyncThunk('favorite/remove',async({blogId,token},{rejectWithValue})=>{

    try{
       await axios.delete(`${apiurl}/blog/removefavorite/${blogId}`,{
        headers:{Authorization: `Bearer ${token}`}
       })

      
       return blogId

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

        //add fav
        .addCase(addfavorite.pending,(state)=>{
            state.loading=true
        })
        .addCase(addfavorite.fulfilled,(state,action)=>{
            const exists=state.favourite.some((blog)=>blog._id===action.payload._id)

            if(!exists){
                state.favourite.push(action.payload);
            }
          
            
            
            state.loading=false;
        })
         .addCase(addfavorite.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })

       //get
        .addCase(getfavouriteblog.pending,(state)=>{
            state.loading=true
        })

        .addCase(getfavouriteblog.fulfilled,(state,action)=>{
           state.favourite=action.payload
            state.loading=false
        })

        .addCase(getfavouriteblog.rejected,(state,action)=>{
            state.error=action.error.message
        })
        



        //remove favorite

        .addCase(removefavorite.pending,(state)=>{
           state.loading=true
        })

        .addCase(removefavorite.fulfilled,(state,action)=>{
            state.favourite=state.favourite.filter(blog=>blog._id!==action.payload)
            state.loading=false;
        })

         .addCase(removefavorite.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})


export default favoriteblogslice.reducer;