import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const CreateProfile = () => {

    const { pageId } = useParams();
    const [image, setImage] = useState(null);
    const [info, setInfo] = useState(null);
    const [url, setUrl] = useState(null);
    const [yturl, setYturl] = useState(null);
    const [instaurl, setInstaurl] = useState(null);
    const [fburl, setFburl] = useState(null);
    const [data, setData] = useState(null);
    const push = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/getProfile/${pageId}`);
                if (res) {
                    setData(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [pageId]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('info', info?info:data.profile_info); 
        formData.append('url', url?url:data.profile_url); 
        formData.append('yturl', yturl?yturl:data.profile_yturl); 
        formData.append('instaurl', instaurl?instaurl:data.profile_insta); 
        formData.append('fburl', fburl?fburl:data.profile_fburl); 
        formData.append('pid', pageId);

        try {
            const res = await axios.post('http://localhost:8080/api/createProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res) {
                push(`/post/${pageId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className='text-danger text-center'>Profile</h2>
                    <form className='bg-white p-4 rounded-3 shadow-lg'>
                    <div className="form-group">
                            <div className="image-upload-container">
                                <input
                                    type="file"
                                    id="profilePicture"
                                    name="profilePicture"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="file-input"
                                />
                           <img src={` http://localhost:8080/${data?.profile_image}`} alt='profile' className='rounded-circle object-fit-cover' style={{width:'50px',height:'50px'}}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="profileInfo">Profile Info</label>
                            <textarea
                                className="form-control"
                                id="profileInfo"
                                name="profileInfo"
                                rows="4"
                                style={{ resize: 'none' }}
                                value={info || (data && data.profile_info)}
                                onChange={(e) => setInfo(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ytUrl">YouTube URL</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ytUrl"
                                name="ytUrl"
                                value={yturl || (data && data.profile_yturl)}
                                onChange={(e) => setYturl(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="websiteUrl">Website URL</label>
                            <input
                                type="text"
                                className="form-control"
                                id="websiteUrl"
                                name="websiteUrl"
                                value={url || (data && data.profile_url)}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="instaUrl">Instagram URL</label>
                            <input
                                type="text"
                                className="form-control"
                                id="instaUrl"
                                name="instaUrl"
                                value={instaurl || (data && data.profile_insta)}
                                onChange={(e) => setInstaurl(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fbUrl">Facebook URL</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fbUrl"
                                name="fbUrl"
                                value={fburl || (data && data.profile_fburl)}
                                onChange={(e) => setFburl(e.target.value)}
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

export default CreateProfile;
