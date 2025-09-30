
import { createRoot } from 'react-dom/client'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
 //import Navbar from './components/navbar';
import Myblogs from './components/myblog';
 import Home from './components/home';
import Favourite from './components/favourite';
import Aboutus from './components/aboutus';
import Login from './components/login'
import Signup from './components/signup';
import App from './App'
import Shareblogs from './components/shareblog';
import AuthProvider from './components/AuthProvider';
import ProctectedRoute from './components/ProctectedRoute';

import Viewblog from './components/viewblog';
import EditBlog from './components/editblog';



const router=createBrowserRouter([
     {
        path:"/",
        element:<App/>,
        children:[
             {path:'/',element:<Home/>},
           
            {path:`/myblogs`,element:
              <ProctectedRoute>
                <Myblogs/>
              </ProctectedRoute>
            },
            {path:'/favourite',
              element:<ProctectedRoute>
                <Favourite/>
              </ProctectedRoute>
            },
            {path:'/aboutus',element:<Aboutus/>},
            {path:'/login',element:<Login/>},
            {path:'/signup',element:<Signup/>},
            {path:'/shareblog', element:
              <ProctectedRoute>
                <Shareblogs/>
              </ProctectedRoute>
            },
            {path:`/viewblog/:id`, element:<Viewblog/>},
            {path:`/editblog/:id`,element:<EditBlog/>},
           
        ]
     }
])

createRoot(document.getElementById('root')).render(
 <>

   <AuthProvider>
     <RouterProvider router={router}/> 
   </AuthProvider>
    
     
 </>
)
