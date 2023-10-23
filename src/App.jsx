import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './AllRoutes/AllRoutes';



const App = () => {


  const isHomePage = window.location.pathname === '/';

  const backgroundStyle = isHomePage
    ? {
        background:
          'linear-gradient(0deg, rgba(58,63,180,0.9234287464985994) 13%, rgba(226,29,253,0.5732886904761905) 65%)',
        minHeight: '100vh',
      }
    : {
        background: 'white',
        minHeight: '100vh',
      };
  
  return (
    <div className='px-4 py-2' style={backgroundStyle}>
      <BrowserRouter>
      <Navbar/>
      <AllRoutes/>
      </BrowserRouter>
    </div>
  )
}

export default App

