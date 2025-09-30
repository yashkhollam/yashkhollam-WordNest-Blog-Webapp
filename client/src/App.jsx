
import './App.css'

import Navbar from './components/navbar'
import {Toaster} from 'react-hot-toast'
function App() {
  

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
