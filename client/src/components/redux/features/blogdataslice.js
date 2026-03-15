import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
  const apiurl = import.meta.env.VITE_API_URL;


  export const getallblogsthunk=createAsyncThunk('blog/getallblogsthunk',async(rejectWithValue)=>{
    try{
      const response=await axios.get(`${apiurl}/blog/getallblogs`);
      
      return response.data;
     
    }
    catch(err){
        console.log(err);
        return rejectWithValue(err.response?.data?.message)
    }
})

//by id


  export const getblogbyIdthunk=createAsyncThunk('blog/getblogbyIdthunk',async(id,{rejectWithValue})=>{
    try{
      // console.log("thubk yun with id=",id)
      const response=await axios.get(`${apiurl}/blog/viewblog/${id}`);
      
      //  console.log(response.data)
      return response.data;
     
     
    }
    catch(err){   
        console.log(err);
        return rejectWithValue(err.response?.data?.message)
    }
})

//update

  export const userblogthunk=createAsyncThunk('blog/userblogthunk',async(_,{rejectWithValue})=>{
    try{
     
      const response=await axios.get(`${apiurl}/blog/myblogs`,{
        withCredentials:true
      });

      // console.log("blog data",response.data)
      
      return response.data;
     
    }
    catch(err){
        console.log(err);
        return rejectWithValue(err.response?.data?.message)
    }
})

//create

  export const createblogthunk=createAsyncThunk('blog/createblogthunk',async(form,{rejectWithValue})=>{
    try{
      const response=await axios.post(`${apiurl}/blog/createblog`,form);
      
      return response.data;
     
    }
    catch(err){
        console.log(err);
        return rejectWithValue(err.response?.data?.message)
    }
})


//update

  export const updateblogthunk=createAsyncThunk('blog/updateblogthunk',async({id,form},{rejectWithValue})=>{
    try{
      console.log("data=",{id,form})
      const response=await axios.patch(`${apiurl}/blog/updateblog/${id}`,form);
      
      return response.data;
     
    }
    catch(err){
        console.log(err);
        return rejectWithValue(err.response?.data?.message)
    }
})


//delete


  export const deleteblogthunk=createAsyncThunk('blog/deleteblogthunk',async(id,{rejectWithValue})=>{
    try{
      const response=await axios.delete(`${apiurl}/blog/deleteblog/${id}`);
      

          console.log("data",response.data)
      return response.data;
  
     
    }
    catch(err){
        console.log(err);
        return rejectWithValue(err?.response?.data?.message)
    }
})





const blogslice=createSlice({
    name:"blogdata",
    initialState:{
      allblogs:[],
      userblogs:[],
      blog:null,
      error:null,
      loading:{
        allblogsloading:false,
        blogbyidloading:false,
        userblogloading:false,
        createblogloading:false,
        updateblogloading:false,
        deleteblogloading:false,
        viewblogloading:false
      }
      
    },
     reducers:{},
     extraReducers:(builder)=>{
        builder
        
        .addCase(getallblogsthunk.pending,(state)=>{
            state.loading.allblogsloading=true
            state.error=null
        })

        
        .addCase(getallblogsthunk.fulfilled,(state,action)=>{
            state.allblogs=action.payload.data
            state.loading.allblogsloading=false
            state.error=false
        })

        
        .addCase(getallblogsthunk.rejected,(state,action)=>{
          state.error=action.payload
          state.loading.allblogsloading=false
        })
  

        //by id 

         .addCase(getblogbyIdthunk.pending,(state)=>{
            state.loading.blogbyidloading=true
            state.error=null
        })

        
        .addCase(getblogbyIdthunk.fulfilled,(state,action)=>{
            state.blog=action.payload.data
            state.loading.blogbyidloading=false
            state.error=false
        })

        
        .addCase(getblogbyIdthunk.rejected,(state,action)=>{
          state.error=action.payload
          state.loading.blogbyidloading=false
        })


        //userblog
         .addCase(userblogthunk.pending,(state)=>{
            state.loading.userblogloading=true
            state.error=null
        })

        
        .addCase(userblogthunk.fulfilled,(state,action)=>{
            state.userblogs=action.payload.data
            state.loading.userblogloading=false
            state.error=null
        })

        
        .addCase(userblogthunk.rejected,(state,action)=>{
          state.error=action.payload
          state.loading.userblogloading=false
        })

        //createblog

        .addCase(createblogthunk.pending,(state)=>{
            state.loading.createblogloading=true
            state.error=null
        })

        
        .addCase(createblogthunk.fulfilled,(state,action)=>{
            // state.allblogs=action.payload.data
            state.loading.createblogloading=false
            state.error=null
        })

        
        .addCase(createblogthunk.rejected,(state,action)=>{
          state.error=action.payload
          state.loading.createblogloading=false
        })




        //updateblog 
        .addCase(updateblogthunk.pending,(state)=>{
            state.loading.updateblogloading=true
            state.error=null
        })

        
        .addCase(updateblogthunk.fulfilled,(state,action)=>{
            // state.allblogs=action.payload.data
            state.loading.updateblogloading=false
            state.error=null
        })

        
        .addCase(updateblogthunk.rejected,(state,action)=>{
          state.error=action.payload
          state.loading.updateblogloading=false
        })


        //delete blog
        .addCase(deleteblogthunk.pending,(state)=>{
            state.loading.deleteblogloading=true
            state.error=null
        })

        
        .addCase(deleteblogthunk.fulfilled,(state,action)=>{
            const {id}=action.payload.data

            state.allblogs=state.allblogs.filter((data)=>data._id!==id)
            state.loading.deleteblogloading=false
            state.error=null
        })

        
        .addCase(deleteblogthunk.rejected,(state,action)=>{
          state.error=action.payload
          state.loading.deleteblogloading=false
        })


        
     }    
})

export default blogslice.reducer;