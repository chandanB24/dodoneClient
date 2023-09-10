import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './AllRoutes/AllRoutes';


const App = () => {
  return (
    <div className='px-4 py-2' style={{backgroundColor:'#e3f2fd',minHeight:'100vh'}}>
      <BrowserRouter>
      <Navbar/>
      <AllRoutes/>
      </BrowserRouter>
    </div>
  )
}

export default App

// #e3f2fd