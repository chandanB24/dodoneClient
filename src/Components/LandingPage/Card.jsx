import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaYoutube } from 'react-icons/fa';
import { RxExternalLink } from 'react-icons/rx'

const Card = () => {

    const [data,setData] = useState(null);
    const {pageId} = useParams();

    useEffect(()=>{
        const fetchData = async () =>{
            const res = await axios.get(`http://localhost:8080/api/posts/${pageId}`)
            setData(res.data)
        }
        fetchData();
    },[pageId])

    const getTimeAgo = (timestamp) =>{
        const now = new Date();
        const postTime = new Date(timestamp);
        const timediiference = now - postTime;
        const minutesAgo = Math.floor(timediiference/(1000 * 60))
        
        if (minutesAgo < 60) {
            return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
        } else if (minutesAgo < 1440) {
            const hoursAgo = Math.floor(minutesAgo / 60);
            return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
        } else {
            const daysAgo = Math.floor(minutesAgo / 1440);
            return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
        }

      }

  return (
    <>
    {   data&&data.map((item)=>(
        <div className='col' key={item.post_id}>
        <div className='card border-0 shadow-lg'> 
        {/* <img src={image} alt='img' className='card-img-top'/> */}
        <div className="card-body">
            <h5 className="card-title fw-bolder" style={{fontFamily:'Poppins',fontWeight:'lighter 300',color:'#18181B'}}>{item.post_title}</h5>
            <p className="card-text fw-light mb-2" style={{fontFamily:"Poppins",fontWeight:'Extralight 200',color:'#71717A'}}>{item.post_body}</p>
        <div>
            <p className='card-text m-0 fw-medium' style={{color:'#A1A1AA'}}>{getTimeAgo(item.post_timestamp)}</p>
            <div className='d-flex justify-content-start mt-1'>
            <a className="btn btn-sm btn-secondary rounded-circle" href={item.yt_url?item.yt_url:'/'}><FaYoutube color='white'/></a>
            <a className="btn btn-sm btn-secondary rounded-circle mx-2" href={item.yt_url?item.yt_url:'/'}><RxExternalLink color='white'/></a>
            </div>
        </div>
        </div>
    </div>
    </div>
    ))}
    </>
  )
}

export default Card