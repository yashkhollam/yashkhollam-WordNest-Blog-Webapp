import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const signupthunk=createAsyncThunk('signupthunk',async(formdata,{rejectWithValue})=>{
    try{
         
        const res=await axios.post(`${import.meta.env.VITE_API_URL}/userauth/signup`,formdata)
        return res.data
    } 

    catch(err){
        return rejectWithValue(err?.response?.data?.message || err.message)
    }
})



export const loginthunk=createAsyncThunk('loginthunk',async(formdata,{rejectWithValue})=>{
    try{
         
        const res=await axios.post(`${import.meta.env.VITE_API_URL}/userauth/login`,formdata,{withCredentials:true})
        return res.data
    } 

    catch(err){
        return rejectWithValue(err?.response?.data?.message || err.message)
    }
})

export const logoutthunk=createAsyncThunk('logoutthunk',async(_,{rejectWithValue})=>{
    try{
         
        const res=await axios.post(`${import.meta.env.VITE_API_URL}/userauth/logout`,{},{withCredentials:true})
        return res.data
    } 

    catch(err){
        return rejectWithValue(err?.response?.data?.message || err.message)
    }
})


export const getmethunk=createAsyncThunk('getmethunk',async(_,{rejectWithValue})=>{

    try{
        const res=await axios.get(`${import.meta.env.VITE_API_URL}/userauth/getme`,{withCredentials:true})

    return res.data
    }

    catch(err){
        return rejectWithValue(err?.response?.message?.data)
    }
    
})




const userAuthSlice=createSlice({
    name:"userAuth",
    initialState:{
        user:null,
        isAuthenticated:false,
        isauthChecked:false,
        error:null,
        loading:{
            signuploading:false,
            loginloading:false,
            getmeloading:false,
            logoutloading:false
        },
    },
    reducers:{},

    extraReducers:(building)=>{
        building
        .addCase(signupthunk.pending,(state)=>{
           state.loading.signuploading=true;
           state.error=null
        })

        .addCase(signupthunk.fulfilled,(state)=>{
           state.loading.signuploading=false;
           state.error=null
        })

        .addCase(signupthunk.rejected,(state,action)=>{
           state.loading.signuploading=false;
           state.error=action.payload
        })


        //login

         .addCase(loginthunk.pending,(state)=>{
           state.loading.loginloading=true;
           state.error=null
        })

        .addCase(loginthunk.fulfilled,(state,action)=>{
         state.user=action.payload.data
            state.loading.loginloading=false;
           state.isAuthenticated=true,
           state.isauthChecked=true
           state.error=null
        })

        .addCase(loginthunk.rejected,(state,action)=>{
            
            state.loading.loginloading=false;
           state.error=action.payload
        })

        //logout

         .addCase(logoutthunk.pending,(state)=>{
           state.loading.logoutloading=true;
           state.error=null
        })

        .addCase(logoutthunk.fulfilled,(state)=>{
            state.user=null
           state.loading.logoutloading=false;
           state.isAuthenticated=false,
           state.isauthChecked=true
           state.error=null
        })

        .addCase(logoutthunk.rejected,(state,action)=>{
            
            state.loading.logoutloading=false;
           state.error=action.payload
        })
       
        //getme
         .addCase(getmethunk.pending,(state)=>{
           state.loading.getmeloading=true;
           state.error=null;
        })

        .addCase(getmethunk.fulfilled,(state,action)=>{
             console.log(action.payload)
            state.user=action.payload.data;
            state.loading.getmeloading=false;
           state.isAuthenticated=true;
           state.isauthChecked=true;
           state.error=null;
        })

        .addCase(getmethunk.rejected,(state,action)=>{
            state.user=null;
            state.isAuthenticated=false;
           state.isauthChecked=true;
            state.loading.getmeloading=false;
           state.error=action.payload;
        })
    }
})


export default userAuthSlice.reducer