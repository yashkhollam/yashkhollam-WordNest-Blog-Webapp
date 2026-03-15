import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const apiurl=import.meta.env.VITE_API_URL;

export const addFavouriteblogthunk=createAsyncThunk('favorite/add',async(blogId,{rejectWithValue})=>{
    try{
       const response=await axios.post(`${apiurl}/blog/addfavourite/${blogId}`,{},{withCredentials:true})
  
  //console.log(response.data,"from slice")
   return response.data;
    }


    catch (err) {
   
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
})


export const getFavouriteblogthunk=createAsyncThunk('favorite/getblog',async(_,{rejectWithValue})=>{
    try{
       const response=await axios.get(`${apiurl}/blog/getfavouriteblog`,{withCredentials:true}
        )
     
     return response.data;
   
}


    catch(err){
        console.log(err.response.message || err);
        return rejectWithValue(err?.response?.data?.message || err.message);
    }
})








export const removeFavouriteblogthunk=createAsyncThunk('favorite/remove',async(blogId,{rejectWithValue})=>{

    try{
       
     const response = await axios.delete(`${apiurl}/blog/removefavourite/${blogId}`,{withCredentials:true})

       console.log("from thunk",response.data.data)
       return response.data


    }
    catch(err){
        console.log(err);
       return rejectWithValue(err?.response?.data?.message || err.message);

    }

})


const favouriteblogslice=createSlice({
    name:'favouriteblog',
   
    initialState:{
        favourite:[],
        loading:{
            addfavouriteloading:null,
            getallfavouriteloading:false,
            removefavouriteloading:false
        },
        error:null},
   
    reducers: {
      setLogoutUser: (state) => { 
      state.favourite=[];
    }
},
  
    extraReducers:(builder)=>{
        builder

        //add fav
        .addCase(addFavouriteblogthunk.pending,(state)=>{
            state.loading.addfavouriteloading=true
            state.error=null
        })
        .addCase(addFavouriteblogthunk.fulfilled,(state,action)=>{
            const exists=state.favourite.some((blog)=>blog._id===action.payload.data._id)


            if(!exists){
                state.favourite.push(action.payload.data);
            }
          
            
            
            state.loading.addfavouriteloading=false;
        })
         .addCase(addFavouriteblogthunk.rejected,(state,action)=>{
            state.loading.addfavouriteloading=false;
            state.error=action.error.message;
        })

       //get
        .addCase(getFavouriteblogthunk.pending,(state)=>{
            state.loading.getallfavouriteloading=true
        })

        .addCase(getFavouriteblogthunk.fulfilled,(state,action)=>{
           state.favourite=action.payload.data
            state.loading.getallfavouriteloading=false
        })

        .addCase(getFavouriteblogthunk.rejected,(state,action)=>{
            state.error=action.payload
        })
        



        //remove favorite

        .addCase(removeFavouriteblogthunk.pending,(state)=>{
           state.loading.removefavouriteloading=true
        })

        .addCase(removeFavouriteblogthunk.fulfilled,(state,action)=>{
            // console.log("from reducer=",action.payload.data)
            state.favourite=action.payload.data
            state.loading.removefavouriteloading=false;
        })

         .addCase(removeFavouriteblogthunk.rejected,(state,action)=>{
            state.loading.removefavouriteloading=false;
            state.error=action.payload;
        })
    }
})


export const { setLogoutUser} =favouriteblogslice.actions;
export default favouriteblogslice.reducer;