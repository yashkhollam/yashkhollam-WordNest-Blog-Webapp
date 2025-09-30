
// import {toast} from 'react-hot-toast'

import axios from 'axios'
import '../css/shareblog.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRef } from 'react'



function EditBlog() {
 const {id}=useParams()


const data1={
  title:"",
  category:"",
  description:"",
  image:null,
  imgurl:""
  
}
const [input,setInput]=useState(data1)

const handleinput=(e)=>{
  console.log({...input,[e.target.name]:e.target.value})

 const {files,name,value}=e.target
if(name==="image"){
  setInput({...input,[name]:files[0]})
}
else{
  setInput({...input,[name]:value})
}

}

useEffect(()=>{
   const fetchblogdata=async()=>{
  const response=await axios.get(`http://localhost:7878/blog/viewblog/${id}`)

  console.log(response.data.data)
  const data=response.data.data
  setInput({
    title:data.title,
    category:data.category,
    description:data.description,
    image:null,
   
  })
   return response.data.data
   
}
fetchblogdata()
},[])



const refrence=useRef()

 const updateblog=async(e)=>{
  e.preventDefault()
    try{
   
      const formdata=new FormData()

      formdata.append('title',input.title)
      formdata.append('category',input.category)
      formdata.append('description',input.description)

      if(input.image){
         formdata.append('image',input.image)
      }
     
      




    const response=await axios.patch(`http://localhost:7878/blog/updateblog/${id}`,formdata,{
       'Content-Type':"multipart/form-data",
    })
    
    
    console.log(response.data.data)
    const {message}=response.data
    toast.success(message)
    }
    catch(err){
      console.log(err)
      toast.error("failed to update the blog")
      refrence.current.value=""
      setInput({
  title:"",
  category:"",
  description:"",
  image:null,
  
})
    }
 }
  
  return (
   <>

    
     <div className="container-fluid  min-vh-100" id='container1' >
      <div className="row w-100 " style={{maxWidth:"1000px"}}>
        <div className="col-12">

          <h1 className='text-center pb-4' style={{color:"#374151"}}>Update Blog</h1>
            <form className='form ' id='form' onSubmit={updateblog}>
              
              <div className='' id='data'>
                <label className='form-label fs-3 ms-3' id='formlabel'>Title :</label>

                <input type="text"
                       className='form-control'
                        id='inputtext'
                        name='title'
                        value={input.title}
                        onChange={handleinput}
                       />
              </div> 


              <div className='' id='data' >
                <label className='form-label fs-3 ms-3' id='formlabel'>Category :</label>

                <select name="category"
                          id='inputtext' 
                       className='form-select'
                       value={input.category}
                        onChange={handleinput}
                       
                      
                       >
                    <option value="" id='formlabel'>select a Category</option>     
                  <option value="Destination">Destination</option>
                   <option value="Lifestyle">Lifestyle</option>
                    <option value="Culinary">Culinary</option>
                     <option value="Tips&Hacks">Tips&Hacks</option>
                      <option value="Food">Food</option>
                        <option value="Tech">Tech</option>
                </select>
              </div> 


              <div className='' id='data'>
                <label className='form-label fs-3 ms-3' id='formlabel'>Description :</label>

                <textarea 
                          className='form-control'
                          type="text"
                            id='inputtext'
                        style={{height:"100px"}}
                          name="description"
                          value={input.description}
                          onChange={handleinput}
                          ></textarea>

              </div> 


              <div id='data'>
               <label htmlFor="" className='form-label fs-3 ms-3' id='formlabel'>file :</label>
               <input type="file"
                      
                      name='image'
                      id='inputtext'
                      accept='image/*'
                       onChange={handleinput}
                       ref={refrence}
  
                       />
              

              </div>
            <div className='d-flex  justify-content-center'id='postbtn-container'>
                <button type='submit' className='btn' id='postbtn'>Update</button>
            </div>
            

            </form>
        </div>
      </div>
     </div>
   </>
  )
}

export default EditBlog