import React, { useEffect, useState } from 'react'
import Hero from './Hero'
import Profile from './Profile'
import PostSection from './PostSection'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const LandingPage = () => {
    
   const [hero,setHero] = useState(false);
   const [profile,setProfile] = useState(false);
   const {pageId} = useParams()

  useEffect(()=>{
      const fetchData = async ()=>{
        const res = await axios.get(`http://localhost:8080/api/getPageSettings/${pageId}`)
        if(res.data){
            setHero(res.data.hero === '1')
            setProfile(res.data.profile === '1')
        }
      }
      fetchData();    
  },[pageId])


  return (
    <div className='cotainer-fluid py-3'>
    <div className="row">
      {hero && <div className="col-lg-9 col-md-8 col-sm-12">
            <Hero/>
        </div>}
      {profile && <div className="col-lg-3 col-md-4 col-sm-12">
            <Profile/>
        </div>}
        <div className='col-12 mt-2'>
            <PostSection/>
        </div>
    </div>
</div>
  )
}

export default LandingPage