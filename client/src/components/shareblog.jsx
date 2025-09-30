import React, { useContext, useRef, useState } from 'react'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import '../css/shareblog.css'
import { AuthContext } from './AuthProvider'

function Shareblogs() {
 const apiurl=import.meta.env.VITE_API_URL;

  const {auth}=useContext(AuthContext)
const data={title:"",category:"",description:"",image:""}

  const[input,setInput]=useState(data)
  const [loading,setLoading]=useState(false)
  const clearinput=useRef()
  
  const handleinput=(e)=>{
   const{name,value,files}=e.target;
    
    console.log({...input,[name]:value})
    
    if(name==="image"){
       setInput({...input,image:files[0]}) 
    }
    else{
      setInput({...input,[name]:value})
    }
    
  }

  const submitform=async(e)=>{
    e.preventDefault();
    try{


      setLoading(true)

      const formdata=new FormData();
        formdata.append("title",input.title)
        formdata.append("category",input.category)
        formdata.append('description',input.description )
        formdata.append('image',input.image)
        formdata.append('author',localStorage.getItem('username'))
        

        if (!input.image) {
  alert("Please select an image before submitting.");
  return;
}
       
        // const response=await axios.post(`http://localhost:7878/blog/createblog`
         const response=await axios.post(`${apiurl}/blog/createblog`
          ,formdata
          ,{
          headers:{
            "Content-Type":"multipart/form-data",
             Authorization:`Bearer ${auth.token}`
          },
        }
      )
       
        const {message}=response.data
        toast.success(message)
        clearinput.current.value="";
        setInput({title:"",category:"",description:"",image:""})
        console.log("Blog created:",response.data)

        // return response.data

        
    }
    catch(err){
      console.log(err)
      toast.error(err.response.data.message)
    }
    finally{
      setLoading(false)
    }
  }

  return (
   <>

     {
      loading&&(
        <div id='spinner-container'>
           <div className="spinner-border text-primary " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
        </div>
      )
     }
     <div className="container-fluid  min-vh-100" id='container1' >
      <div className="row w-100" style={{maxWidth:"1000px"}}zz>
        <div className="col-12">
            <form className='form ' id='form' onSubmit={submitform}>
              
              <div className='' id='data'>
                <label className='form-label fs-3 ms-3' id='formlabel'>Title :</label>

                <input type="text"
                       className='form-control'
                        id='inputtext'
                        onChange={handleinput}
                        name='title'
                        value={input.title}/>
              </div> 


              <div className='' id='data' >
                <label className='form-label fs-3 ms-3' id='formlabel'>Category :</label>

                <select name="category"
                         value={input.category}
                       id='inputtext'
                       className='form-select'
                       onChange={handleinput}
                       >
                    <option value="">select a Category</option>     
                  <option value="Destination">Destination</option>
                   <option value="Lifestyle">Lifestyle</option>
                    <option value="Culinary">Culinary</option>
                     <option value="Tips&Hacks">Tips&Hacks</option>
                      <option value="Food">Food</option>
                        <option value="Tech">Tech</option>
                </select>
              </div> 


              <div className='' id='data' >
                <label className='form-label fs-3 ms-3' id='formlabel'>Description :</label>

                <textarea type="text"
                       className='form-control'
                         id='inputtext'
                        style={{height:"100px"}}
                        onChange={handleinput}
                        name='description'
                        value={input.description } />
              </div> 


              <div id='data'>
               <label htmlFor="" className='form-label fs-3 ms-3' id='formlabel'>file :</label>
               <input type="file"
                      onChange={handleinput}
                      name='image'
                      id='inputtext'
                      accept='image/*'
                      ref={clearinput}
  
                       />
              </div>
            <div className='d-flex  justify-content-center'id='postbtn-container'>
                <button type='submit' className='btn' id='postbtn'>Post</button>
            </div>
            

            </form>
        </div>
      </div>
     </div>
   </>
  )
}

export default Shareblogs