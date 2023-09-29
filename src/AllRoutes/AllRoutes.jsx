import React from 'react'
import {Routes,Route } from 'react-router-dom'
import LandingPage from '../Components/LandingPage/LandingPage'
import Auth from '../Components/Auth/Auth'
import Dashboard from '../Components/Dashboard/Dashboard'
import CreatePage from '../Components/PostBox/CreatePage'
import EndUser from '../Components/EndUser/EndUser'
import CreateProfile from '../Components/LandingPage/CreateProfile'




const AllRoutes = () => {
  return (
   
        <Routes>
            <Route path='/' element={<Auth/>}></Route>
            <Route path='/dashboard/:userId' element={<Dashboard/>}></Route>
            <Route path='/post/:pageId' element={<LandingPage/>}></Route>
            <Route path='/createPage' element={<CreatePage/>}></Route>
            <Route path='/createProfile/:pageId' element={<CreateProfile/>}></Route>
            <Route path='/:pageName' element={<EndUser/>}></Route>
        </Routes>
   
  )
}

export default AllRoutes