import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const CreateProfile = () => {

    const {pageId} = useParams()
    const [image,setImage] = useState(null);
    const [info,setInfo] = useState(null);
    const [url,setUrl] = useState(null);
    const [yturl,setYturl] = useState(null);
    const [instaurl,setInstaurl] = useState(null);
    const [fburl,setFburl] = useState(null);
    const push = useNavigate()

    const handleImageChange = (e) =>{
        setImage(e.target.files[0]);
    }


    const handleUpload = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image',image);
        formData.append('info',info);
        formData.append('url',url);
        formData.append('yturl',yturl);
        formData.append('instaurl',instaurl);
        formData.append('fburl',fburl);
        formData.append('pid',pageId);

        
        try {
            const res = await axios.post('http://localhost:8080/api/createProfile',formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            })
            if(res){
            push(`/post/${pageId}`)
            }
        } catch (error) {
            console.log(error)
        }

    }



  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className='text-danger text-center'>Profile</h2>
          <form className='bg-white p-4 rounded-3 shadow-lg'>
            <div className="form-group">
              <label htmlFor="profilePicture">Profile Picture</label>
              <input
                type="file"
                className="form-control"
                id="profilePicture"
                name="profilePicture"
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profileInfo">Profile Info</label>
              <textarea
                className="form-control"
                id="profileInfo"
                name="profileInfo"
                rows="4"
                style={{resize:'none'}}
                onChange={(e)=>setInfo(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="ytUrl">YouTube URL</label>
              <input
                type="text"
                className="form-control"
                id="ytUrl"
                name="ytUrl"
                onChange={(e)=>setYturl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="websiteUrl">Website URL</label>
              <input
                type="text"
                className="form-control"
                id="websiteUrl"
                name="websiteUrl"
                onChange={(e)=>setUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="instaUrl">Instagram URL</label>
              <input
                type="text"
                className="form-control"
                id="instaUrl"
                name="instaUrl"
                onChange={(e)=>setInstaurl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fbUrl">Facebook URL</label>
              <input
                type="text"
                className="form-control"
                id="fbUrl"
                name="fbUrl"
                onChange={(e)=>setFburl(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-danger mt-3" onClick={handleUpload}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProfile