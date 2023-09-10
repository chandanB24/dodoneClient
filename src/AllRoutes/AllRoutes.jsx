import React from 'react'
import {Routes,Route } from 'react-router-dom'
import LandingPage from '../Components/LandingPage/LandingPage'
import Auth from '../Components/Auth/Auth'
import Dashboard from '../Components/Dashboard/Dashboard'




const AllRoutes = () => {
  return (
   
        <Routes>
            <Route path='/' element={<Auth/>}></Route>
            <Route path='/dashboard/:userId' element={<Dashboard/>}></Route>
            <Route path='/post/:pageId' element={<LandingPage/>}></Route>
        </Routes>
   
  )
}

export default AllRoutes