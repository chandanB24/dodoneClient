import React, { useEffect, useState } from 'react'
import bgImg from '../../assets/bg.png'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { RxExternalLink } from 'react-icons/rx'
import ReactPlayer from 'react-player'

const EndUserHero = () => {

  const {pageName} = useParams()
  const [data,setData] = useState(null)


  useEffect(()=>{

  const fetchHeroData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/getPageId/${pageName}`)
      const res = await axios.get(`http://localhost:8080/api/getHero/${response.data.pid}`);
      const fetchCard = await axios.get(`http://localhost:8080/api/getHeroPost/${res.data[0].post_id}`);
      setData(fetchCard.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
    fetchHeroData();
  },[])

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
    <div className="card d-flex justify-content-center align-items-start shadow-lg mb-3" style={{padding:'20px',minHeight:'50vh',backgroundImage:`url(${bgImg})`,border:'none'}}>
    <div className="container">
  <div className="row">
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card shadow-lg mb-3" style={{ border: 'none' }}>
        {data && (data.post_title || data.post_body || data.post_url ?
          <div className='card border-0 shadow-lg'>
            {data.image_url ? <img src={data.image_url} alt='img' className='card-img-top' /> :
              <ReactPlayer url={data.yt_url} className='card-img-top' controls width='100%' height='100%' />
            }
            <div className="card-body">
              <h5 className="card-title fw-bolder" style={{ fontFamily: 'Poppins', fontWeight: 'lighter 300', color: '#18181B' }}>{data.post_title}</h5>
              <p className="card-text fw-light mb-2" style={{ fontFamily: "Poppins", fontWeight: 'Extralight 200', color: '#71717A' }}>{data.post_body}</p>
            </div>
            <div className='card-footer border-top-0 bg-white m-0 p-2'>
              <p className='card-text m-0 fw-medium' style={{ color: '#A1A1AA' }}>{getTimeAgo(data.post_timestamp)}</p>
              <div className='d-flex justify-content-start mt-1'>
                <a className="btn btn-sm btn-secondary rounded-circle" href={data.post_url ? data.post_url : '/'}><RxExternalLink color='white' /></a>
              </div>
            </div>
          </div> :
           <div className='card border-0' style={{ minHeight: '40vh', position: 'relative' }}>
           {data.image_url ? (
             <img
               src={data.image_url}
               alt="img"
               className='card-img'
               style={{
                 objectFit: 'cover',
                 width: '100%',
                 height: '100%',
                 position: 'absolute',
                 top: 0,
                 left: 0,
               }}
             />
           ) : (
             <ReactPlayer
               url={data.yt_url}
               className='card-img rounded-lg'
               controls
               style={{
                 width: '100%',
                 height: '100%',
                 objectFit: 'cover',
               }}
             />
           )}
         </div>
        )}
      </div>
    </div>
  </div>
</div>
</div>
  )
}

export default EndUserHero