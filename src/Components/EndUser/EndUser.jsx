import React, { useEffect, useState } from 'react'
import EndUserProfile from './EndUserProfile'
import EndUserPostSection from './EndUserPostSection'
import EndUserHero from './EndUserHero'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const EndUser = () => {

    const {pageName} = useParams();
    const [pageId,setPageId] = useState()
    const [hero,setHero] = useState(false);
    const [profile,setProfile] = useState(false);

    
    const fetchPageId = async ()=>{
        const res = await axios.get(`http://localhost:8080/api/getPageId/${pageName}`)
        setPageId(res.data.pid)
    }

    const fetchData = async ()=>{
        const res = await axios.get(`http://localhost:8080/api/getPageSettings/${pageId}`)
        if(res.data){
            setHero(res.data.hero === '1')
            setProfile(res.data.profile === '1')
        }
      }

    useEffect(()=>{
        fetchPageId();
        fetchData();
    },[pageName,pageId])


  return (
    <div className='cotainer-fluid py-3'>
    <div className="row">
      {hero && <div className="col-lg-9 col-md-8 col-sm-12">
            <EndUserHero/>
        </div>}
      {profile && <div className="col-lg-3 col-md-4 col-sm-12">
            <EndUserProfile/>
        </div>}
        <div className='col-12 mt-2'>
            <EndUserPostSection/>
        </div>
    </div>
</div>
  )
}

export default EndUser