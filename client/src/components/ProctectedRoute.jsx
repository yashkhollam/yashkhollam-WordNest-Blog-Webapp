import React, { useContext, useEffect } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'

function ProctectedRoute({children}) {
    const{auth}=useContext(AuthContext)
   
   if(!auth.token){
       toast("Please login!",{
        icon:'⚠️'
       })

      return  <Navigate to='/login' replace/>
    }
    

  return (
    <>
    {children}
    </>
  )
}

export default ProctectedRoute