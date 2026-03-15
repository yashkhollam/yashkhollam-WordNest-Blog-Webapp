
import { useEffect } from 'react'
import './App.css'

import Navbar from './components/navbar'
import {Toaster} from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import { getmethunk } from './components/redux/features/userAuthSlice'
function App() {
  

const dispatch=useDispatch()

useEffect(()=>{
   dispatch(getmethunk())
},[dispatch])

  return (
    <>
      <Navbar/>
       
      <Toaster position='top-center' reverseOrder={false} containerStyle={{
      
      }}
      
      />
      
    </>
  )
}

export default App
