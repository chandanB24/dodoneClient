import React from 'react'
import img from '../../assets/profile.png'
import {FaInstagram,FaFacebookF,FaYoutube} from 'react-icons/fa'
import {TbWorld} from 'react-icons/tb'

const EndUserProfile = () => {
  return (
    <div className='sidebar rounded shadow-lg' style={{backgroundColor:"#f8f9fa",padding:'20px',minHeight:'50vh'}}>
        <h2 className='fw-bold text-center fs-4' style={{color:'darkblue'}}>Profile</h2>
        <div className='col mt-4 p-2 d-flex justify-content-center align-items-center'>
        <img src={img} alt='profile' className='rounded-circle object-fit-cover' style={{width:'50px'}}/>
        </div>
        <div className='col text-center' style={{fontFamily:"Poppins",fontSize:"16px",fontWeight:'Extralight 200',color:'#71717A'}}>
        <h5 className='fw-bold text-center'>ABC Events</h5><hr />
        <div className='col text-start fs-6'>
            Welcome to one of the finest wedding planner, as u dream<br />
            Bangalore,Karnataka <br />
            577006
        </div>
        <hr />
            <div className="d-flex justify-content-center align-content-center">
                <a href="/" className='mx-1'><FaInstagram/></a>
                <a href="/" className='mx-1'><FaFacebookF/></a>
                <a href="/" className='mx-1'><FaYoutube/></a>
                <a href="/" className='mx-1'><TbWorld/></a>
            </div>
        </div>
    </div>
  )
}

export default EndUserProfile