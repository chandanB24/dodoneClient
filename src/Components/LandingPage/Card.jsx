import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { RxExternalLink } from 'react-icons/rx'
import ReactPlayer from 'react-player'
import {MdOutlineMoreVert} from 'react-icons/md'



const Card = () => {

    const [data,setData] = useState(null);
    const [settings,setSettings] = useState(null)
    const [footer,showFooter] = useState(false)
    const [flatCard,setFlatCard] = useState(false)
    const {pageId} = useParams();


    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/posts/${pageId}`);
        setData(res.data);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    };
  
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/getSettings/${pageId}`);
        setSettings(res.data);
      } catch (error) {
        // Handle errors here
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


    useEffect(() => {
      fetchData();
      fetchSettings();
      fetchPageSettings();
  
     
      const intervalId = setInterval(() => {
        fetchData();
        fetchSettings();
      }, 1000); 
  

      return () => clearInterval(intervalId);
    }, [pageId]);







    const isHighlighted = (postId) => {
        return   settings &&  Array.isArray(settings) && settings.some(
          (setting) => setting.post_id === postId && setting.card_highlight === '1'
        );
      };

 
    const pinnedCards = Array.isArray(data) && Array.isArray(settings)
    ? data.filter((item) =>
        settings.some(
          (setting) => setting.post_id === item.post_id && setting.card_pinned === '1'
        )
      )
    : [];

  const nonPinnedCards = Array.isArray(data) && Array.isArray(settings)
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

      const isPinned = (postId) => {
        return (
          settings && Array.isArray(settings) && 
          settings.some(
            (setting) => setting.post_id === postId && setting.card_pinned === '1'
          )
        );
      };

      const handlePinClick = useCallback(async (postId) => {

        if(settings.message){
          try {
            await axios.post('http://localhost:8080/api/cardSettings', {
              pid: pageId,
              post_id: postId,
              pinned: true,
              highlighted:null,
            });
          } catch (error) {
            console.error('Error updating pin status:', error);
          }
        }

        const isAlreadyPinned = isPinned(postId);
        try {
          await axios.post('http://localhost:8080/api/cardSettings', {
            pid: pageId,
            post_id: postId,
            pinned: !isAlreadyPinned,
            highlighted: isHighlighted(postId),
          });
        } catch (error) {
          console.error('Error updating pin status:', error);
        }
      }, [settings,pageId,isHighlighted,isPinned]);
      


      const handleHighlightClick = useCallback(async (postId) => {

        if(settings.message){
          try {
            await axios.post('http://localhost:8080/api/cardSettings', {
              pid: pageId,
              post_id: postId,
              pinned: null,
              highlighted:true,
            });
          } catch (error) {
            console.error('Error updating pin status:', error);
          }
        }

        const isAlreadyHighlighted = isHighlighted(postId);
    
        try {
          await axios.post('http://localhost:8080/api/cardSettings', {
            pid: pageId,
            post_id: postId,
            pinned: isPinned(postId),
            highlighted: !isAlreadyHighlighted,
          });
        } catch (error) {
          console.error('Error updating highlight status:', error);
        }
      }, [settings,pageId,isHighlighted,isPinned]);


      const handleHero = useCallback(async (postId)=>{
        try {
          await axios.post('http://localhost:8080/api/setHero',{
            pid:pageId,
            post_id:postId
          })
        } catch (error) {
          console.log(error)
        }

      },[pageId])


      const handleDelete = useCallback(async (postId)=>{
        try {
          const deletePost = await axios.delete(`http://localhost:8080/api/deletePost/${postId}`)

          if(deletePost){
            console.log(deletePost.data)
          }

        } catch (error) {
          console.log(error)
        }


      })
      

   if(sortedData.length>0){   
  return (
    <>
    {   sortedData&&sortedData.length>0 ?
    sortedData.map((item)=>(
        <div className='col' key={item.post_id}>
        {item.post_title || item.post_body || item.post_url ? 
        <div className={`card border-0 ${!flatCard?'shadow-lg':'shadow-none '} h-100 position-relative ${isHighlighted(item.post_id) ? 'bg-black text-white' : ''}`}>
           <div className="position-absolute" style={{right:'3px',top:'5px'}}>
            <div className="btn-group">
                <button type="button" className='border-0 bg-transparent' data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <MdOutlineMoreVert className='fs-4 text-danger'/>
                </button>
                <div className="dropdown-menu">
                    <li className="dropdown-item" onClick={() => handlePinClick(item.post_id)}>{isPinned(item.post_id) ? 'Unpin' : 'Pin'}</li>
                    <li className="dropdown-item" onClick={() => handleHighlightClick(item.post_id)}>{isHighlighted(item.post_id)?'Unhighlight':'Highlight'}</li>
                    <li className="dropdown-item"onClick={()=>handleHero(item.post_id)}>Hero</li>
                    <li className="dropdown-item" onClick={()=>handleDelete(item.post_id)}>Delete</li>   
                </div>
            </div>
        </div>
        {item.image_url?<img src={item.image_url} alt='img' className='card-img-top'/>:
        <ReactPlayer url={item.yt_url} className='card-img-top' controls width='100%' height='100%'/>
        }
        <div className="card-body">
            <h5 className="card-title fw-bolder" style={{fontFamily:'Poppins',fontWeight:'lighter 300',}}>{item.post_title}</h5>
            <p className="card-text fw-light mb-2" style={{fontFamily:"Poppins",fontWeight:'Extralight 200'}}>{item.post_body}</p>
        </div>
       {footer?<div className={`card-footer border-top-0 ${isHighlighted(item.post_id) ? 'bg-black text-white' : 'bg-white'} m-0 p-2`}>
            <p className='card-text m-0 fw-medium'>{getTimeAgo(item.post_timestamp)}</p>
            <div className='d-flex justify-content-start mt-1'>
            <a className="btn btn-sm btn-secondary rounded-circle" href={item.post_url?item.post_url:'/'}><RxExternalLink color='white'/></a>
            </div>
        </div>:null}
    </div>:
        <div className='card border-0 h-100 position-relative'>
        <div className="position-absolute" style={{right:'3px',top:'5px'}}>
            <div className="btn-group">
                <button type="button" className='border-0 bg-transparent' data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <MdOutlineMoreVert className='fs-4 text-danger'/>
                </button>
                <div className="dropdown-menu">
                <li className="dropdown-item" onClick={() => handlePinClick(item.post_id)}>{isPinned(item.post_id) ? 'Unpin' : 'Pin'}</li>
                <li className="dropdown-item"onClick={()=>handleHero(item.post_id)}>Hero</li>
                    <li className="dropdown-item" onClick={()=>handleDelete(item.post_id)}>Delete</li>
                </div>
            </div>
        </div>
        {item.image_url?<img src={item.image_url} alt="img" className='card-img h-100 w-100' style={{objectFit:'cover',overflow:'hidden'}}/>:
        <ReactPlayer url={item.yt_url} className='card-img rounded-lg' controls width='100%' height='100%'/>
        }
        </div>
        }
    </div>
    )):
    <div className='d-flex justify-content-center align-items-center flex-column'>
        <h5>Create your first post now</h5>
        <button type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Post Now
        </button>
    </div>
        
    }
    </>
  )
}
    return (
        <>
        {   data&&data.length>0 ?
        data.map((item)=>(
            <div className='col' key={item.post_id}>
            {item.post_title || item.post_body || item.post_url ? 
            <div className={`card border-0 ${!flatCard?'shadow-lg':'shadow-none'} shadow-lg h-100 position-relative`}>
               <div className="position-absolute" style={{right:'3px',top:'5px'}}>
                <div className="btn-group">
                    <button type="button" className='border-0 bg-transparent' data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <MdOutlineMoreVert className='fs-4 text-danger'/>
                    </button>
                    <div className="dropdown-menu">
                    <li className="dropdown-item" onClick={() => handlePinClick(item.post_id)}>Pin</li>
                    <li className="dropdown-item" onClick={() => handleHighlightClick(item.post_id)}>Highlight</li>
                    <li className="dropdown-item"onClick={()=>handleHero(item.post_id)}>Hero</li>
                    <li className="dropdown-item" onClick={()=>handleDelete(item.post_id)}>Delete</li>
                    </div>
                </div>
            </div>
            {item.image_url?<img src={item.image_url} alt='img' className='card-img-top'/>:
            <ReactPlayer url={item.yt_url} className='card-img-top' controls width='100%' height='100%'/>
            }
            <div className="card-body">
                <h5 className="card-title fw-bolder" style={{fontFamily:'Poppins',fontWeight:'lighter 300',}}>{item.post_title}</h5>
                <p className="card-text fw-light mb-2" style={{fontFamily:"Poppins",fontWeight:'Extralight 200'}}>{item.post_body}</p>
            </div>
            {footer?<div className='card-footer border-top-0 bg-white'>
                <p className='card-text m-0 fw-medium'>{getTimeAgo(item.post_timestamp)}</p>
                <div className='d-flex justify-content-start mt-1'>
                <a className="btn btn-sm btn-secondary rounded-circle" href={item.post_url?item.post_url:'/'}><RxExternalLink color='white'/></a>
                </div>
            </div>:null}
        </div>:
            <div className='card border-0 h-100 position-relative'>
            <div className="position-absolute" style={{right:'3px',top:'5px'}}>
                <div className="btn-group">
                    <button type="button" className='border-0 bg-transparent' data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <MdOutlineMoreVert className='fs-4 text-danger'/>
                    </button>
                    <div className="dropdown-menu">
                    <li className="dropdown-item" onClick={() => handlePinClick(item.post_id)}>pin</li>
                    <li className="dropdown-item"onClick={()=>handleHero(item.post_id)}>Hero</li>
                    <li className="dropdown-item" onClick={()=>handleDelete(item.post_id)}>Delete</li>
                    </div>
                </div>
            </div>
            {item.image_url?<img src={item.image_url} alt="img" className='card-img h-100 w-100' style={{objectFit:'cover',overflow:'hidden'}}/>:
            <ReactPlayer url={item.yt_url} className='card-img rounded-lg' controls width='100%' height='100%'/>
            }
            </div>
            }
        </div>
        )):
        <div className='d-flex justify-content-center align-items-center flex-column' style={{width:'100%',height:'90vh'}}>
            <h5>Create your first post now</h5>
            <button type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Post Now
            </button>
        </div>  
        }
        </>
      )

}

export default Card