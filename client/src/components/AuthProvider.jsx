// import React, { createContext, useEffect, useState } from 'react';

// export const AuthContext = createContext();

// function AuthProvider({ children }) {
 
 
//   const[auth,setAuth]=useState(()=>({
//   username:localStorage.getItem('username') ||"",
//   token:localStorage.getItem('token' )||"",
//   userId:localStorage.getItem('userId' )||""
// }));


  
//      const login=({username,token,userId})=>{

//       setAuth({username,token,userId});
//         localStorage.setItem('username',username)
//         localStorage.setItem('token',token),
//          localStorage.setItem('userId',userId)
//      }

 

  

//   const logout=()=>{
//      setAuth({username:"",token:"",userId:""})
//     localStorage.removeItem('username')
//     localStorage.removeItem('token')
//        localStorage.removeItem('userId')
   
//   }

//   return (
//     <AuthContext.Provider value={{auth,login,logout}}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export default AuthProvider;

