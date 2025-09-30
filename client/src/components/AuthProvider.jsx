import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
 
 
  const[auth,setAuth]=useState({
  username:localStorage.getItem('username' ||""),
  token:localStorage.getItem('token' ||""),
  userId:localStorage.getItem('userId' ||"")
})


  useEffect(()=>{
     

      if(auth.username&&auth.token){
        localStorage.setItem('username',auth.username)
        localStorage.setItem('token',auth.token),
         localStorage.setItem('userId',auth.userId)
      }

      else{
          localStorage.removeItem('username')
        localStorage.removeItem('token')
         localStorage.removeItem('userId')

      }

    
  },[auth])
 

  

  const logout=()=>{
    localStorage.removeItem('username')
    localStorage.removeItem('token')
       localStorage.removeItem('userId')
    setAuth({username:"",token:"",userId:""})
  }

  return (
    <AuthContext.Provider value={{auth,setAuth,logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

