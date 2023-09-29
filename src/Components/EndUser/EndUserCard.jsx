import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RxExternalLink } from 'react-icons/rx'
import ReactPlayer from 'react-player'

const EndUserCard = () => {

    const {pageName} = useParams()
    const [data,setData] = useState(null)

    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await axios.get(`http://localhost:8080/api/${pageName}`);
            setData(res.data)
        }
        fetchData();
    },[pageName])
    
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
    {   data&&data.length>0 ?
    data.map((item)=>(
        <div className='col' key={item.post_id}>
        {item.post_title || item.post_body || item.post_url ? 
        <div className='card border-0 shadow-lg h-100'> 
        {item.image_url?<img src={item.image_url} alt='img' className='card-img-top'/>:
        <ReactPlayer url={item.yt_url} className='card-img-top' controls width='100%' height='100%'/>
        }
        <div className="card-body">
            <h5 className="card-title fw-bolder" style={{fontFamily:'Poppins',fontWeight:'lighter 300',color:'#18181B'}}>{item.post_title}</h5>
            <p className="card-text fw-light mb-2" style={{fontFamily:"Poppins",fontWeight:'Extralight 200',color:'#71717A'}}>{item.post_body}</p>
        </div>
        <div className='card-footer border-top-0 bg-white m-0 p-2'>
            <p className='card-text m-0 fw-medium' style={{color:'#A1A1AA'}}>{getTimeAgo(item.post_timestamp)}</p>
            <div className='d-flex justify-content-start mt-1'>
            <a className="btn btn-sm btn-secondary rounded-circle" href={item.post_url?item.post_url:'/'}><RxExternalLink color='white'/></a>
            </div>
        </div>
    </div>:
        <div className='card border-0 h-100'>
        {item.image_url?<img src={item.image_url} alt="img" className='card-img h-100 w-100' style={{objectFit:'cover',overflow:'hidden'}}/>:
        <ReactPlayer url={item.yt_url} className='card-img rounded-lg' controls width='100%' height='100%'/>
        }
        </div>
        }
    </div>
    )):
    <div className='d-flex justify-content-center align-items-center flex-column'>
        <h5>No posts yet</h5>
    </div>
        
    }
    </>
  )
}

export default EndUserCard