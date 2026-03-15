import React, { useEffect } from 'react'

import { Navigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import {useSelector} from 'react-redux'
import Loader from './loader'

function ProctectedRoute({children}) {

  const {user,isAuthenticated,isauthChecked}=useSelector((state)=>state.userAuth) 
  
if(!isauthChecked){
  return  <Loader/>

}

  if(!isAuthenticated){
    toast("please login to continue",{
      icon:"⚠️⚠️"
    })
    return  <Navigate to='/' replace={true}/>
    
  }

  return (
    <>
    {children}
    </>
  )
}

export default ProctectedRoute