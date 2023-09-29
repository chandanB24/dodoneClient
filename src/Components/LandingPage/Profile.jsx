import React, { useEffect, useState } from 'react'
import img from '../../assets/profile.png'
import {FaInstagram,FaFacebookF,FaYoutube} from 'react-icons/fa'
import {TbWorld} from 'react-icons/tb'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {

  const [data,setData] = useState();
  const {pageId} = useParams();

    
  useEffect(()=>{
      const fetchData = async() =>{
        try {
          const res = await axios.get(` http://localhost:8080/api/getProfile/${pageId}`);
          if(res){
            setData(res.data)
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchData();
  },[pageId])



  return (
    <div className='sidebar rounded shadow-lg' style={{backgroundColor:"#f8f9fa",padding:'20px',minHeight:'50vh'}}>
    <h2 className='fw-bold text-center fs-4' style={{color:'darkblue'}}>Profile</h2>
    <div className='col mt-4 p-2 d-flex justify-content-center align-items-center'>
       <img src={` http://localhost:8080/${data?.profile_image}`} alt='profile' className='rounded-circle object-fit-cover' style={{width:'50px'}}/>
    </div>
    <div className='col text-center' style={{fontFamily:"Poppins",fontSize:"16px",fontWeight:'Extralight 200',color:'#71717A'}}>
      <h5 className='fw-bold text-center'>ABC Events</h5><hr />
      <div className='col text-start fs-6'>
         {data?data.profile_info:null}<br />
      </div>
      <hr />
          <div className="d-flex justify-content-center align-content-center">
            {data?.profile_insta?<a href={data.profile_insta} className='mx-1'><FaInstagram/></a>:null}
            {data?.profile_fburl?<a href={data.profile_fburl} className='mx-1'><FaFacebookF/></a>:null}
            {data?.profile_yturl?<a href={data.profile_yturl} className='mx-1'><FaYoutube/></a>:null}
           {data?.profile_url?<a href={data.profile_url} className='mx-1'><TbWorld/></a>:null}
          </div>
    </div>
    </div>
  )
}

export default Profile