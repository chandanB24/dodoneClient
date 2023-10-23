import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RxExternalLink } from 'react-icons/rx'
import ReactPlayer from 'react-player'

const EndUserCard = () => {

    const {pageName} = useParams()
    const [data,setData] = useState(null)
    const [footer,showFooter] = useState(false)
    const [flatCard,setFlatCard] = useState(false)
    const [pageId,setPageId] = useState(null)
    const [settings,setSettings] = useState(null)
   

    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await axios.get(`http://localhost:8080/api/${pageName}`);
            setData(res.data)
            
        }

        const fetchPageId = async ()=>{
            const res = await axios.get(`http://localhost:8080/api/getPageId/${pageName}`)
            setPageId(res.data.pid)
        }

        const fetchSettings = async () => {
            try {
              const res = await axios.get(`http://localhost:8080/api/getSettings/${pageId}`);
              setSettings(res.data);
            } catch (error) {
              console.error('Error fetching settings:', error);
            }
          };

          const fetchPageSettings = async () =>{
            try {
              const res = await axios.get(`http://localhost:8080/api/getPageSettings/${pageId}`);
              if(res.data){
                showFooter(res.data.time_stamp === '1')
                setFlatCard(res.data.flat_card === '1')
              }
            } catch (error) {
              console.log(error)
            }
          }

        fetchData();
        fetchPageId();
        fetchSettings();
        fetchPageSettings();
    },[pageId,pageName])

    const isHighlighted = (postId) => {
        return   settings &&  Array.isArray(settings) && settings.some(
          (setting) => setting.post_id === postId && setting.card_highlight === '1'
        );
      };

 
    const pinnedCards = Array.isArray(settings)
    ? data.filter((item) =>
        settings.some(
          (setting) => setting.post_id === item.post_id && setting.card_pinned === '1'
        )
      )
    : [];

  const nonPinnedCards = Array.isArray(settings)
    ? data.filter((item) =>
        !settings.some(
          (setting) => setting.post_id === item.post_id && setting.card_pinned === '1'
        )
      )
    : [];

  // Concatenate pinned cards and non-pinned cards to maintain the order, only if settings is an array
  const sortedData = Array.isArray(settings) ? [...pinnedCards, ...nonPinnedCards] :[];
    

    
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






    if(sortedData.length>0){

  return (
    <>
    {   sortedData&&sortedData.length>0 ?
    sortedData.map((item)=>(
        <div className='col' key={item.post_id}>
        {item.post_title || item.post_body || item.post_url ? 
        <div className={`card border-0 ${!flatCard?'shadow-lg':'shadow-none '} h-100 ${isHighlighted(item.post_id) ? 'bg-black text-white' : ''}`}> 
        {item.image_url?<img src={item.image_url} alt='img' className='card-img-top'/>:
        <ReactPlayer url={item.yt_url} className='card-img-top' controls width='100%' height='100%'/>
        }
        <div className="card-body">
            <h5 className="card-title fw-bolder">{item.post_title}</h5>
            <p className="card-text fw-light mb-2" >{item.post_body}</p>
        </div>
        {footer?<div className={`card-footer border-top-0 ${isHighlighted(item.post_id) ? 'bg-black text-white' : 'bg-white'} m-0 p-2`}>
            <p className='card-text m-0 fw-medium' >{getTimeAgo(item.post_timestamp)}</p>
            <div className='d-flex justify-content-start mt-1'>
            <a className="btn btn-sm btn-secondary rounded-circle" href={item.post_url?item.post_url:'/'}><RxExternalLink color='white'/></a>
            </div>
        </div>:null}
    </div>:
        <div className={`card border-0 h-100 ${!flatCard?'shadow-lg':'shadow-none '}`}>
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

return(
    <>
    {   data&&data.length>0 ?
    data.map((item)=>(
        <div className='col' key={item.post_id}>
        {item.post_title || item.post_body || item.post_url ? 
        <div className={`card border-0 ${!flatCard?'shadow-lg':'shadow-none'} h-100`}> 
        {item.image_url?<img src={item.image_url} alt='img' className='card-img-top'/>:
        <ReactPlayer url={item.yt_url} className='card-img-top' controls width='100%' height='100%'/>
        }
        <div className="card-body">
            <h5 className="card-title fw-bolder" >{item.post_title}</h5>
            <p className="card-text fw-light mb-2" >{item.post_body}</p>
        </div>
       {footer ?<div className={`card-footer border-top-0 ${isHighlighted(item.post_id) ? 'bg-black text-white' : 'bg-white'} m-0 p-2`}>
            <p className='card-text m-0 fw-medium' >{getTimeAgo(item.post_timestamp)}</p>
            <div className='d-flex justify-content-start mt-1'>
            <a className="btn btn-sm btn-secondary rounded-circle" href={item.post_url?item.post_url:'/'}><RxExternalLink color='white'/></a>
            </div>
        </div>:null}
    </div>:
        <div className={`card border-0 h-100 ${!flatCard?'shadow-lg':'shadow-none '}`}>
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