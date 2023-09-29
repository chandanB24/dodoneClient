import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import {GrMoreVertical} from 'react-icons/gr'
import {FaHeading,FaLink,FaCamera} from 'react-icons/fa'
import {PiTimerFill} from 'react-icons/pi'
import {GiTimeBomb} from 'react-icons/gi'

const PostFooter = ({toggle,setYtUrl,setPostUrl,submitPost}) => {

  const [more,showMore] = useState(false)
  const [media,setMedia] = useState(false)
  const [schedule,setSecdule] = useState(false)
  const [disappear,setDisappear] = useState(false)
  const [startDate, setStartDate] = useState(new Date());

//toggle functions of all icons

  const handleMore = ()=>{
    showMore(!more)
  }


  const handleMedia = ()=>{
    setMedia(!media)
  }



  const handleSchedule = ()=>{
    setSecdule(!schedule)
  }

  const handleDisappear = ()=>{
    setDisappear(!disappear)
  }  
  



  return (
    <>   
    <div className='d-flex' >
      <button className='btn btn-sm border-0' onClick={handleMore}><GrMoreVertical/></button>
      <a  className='btn btn-sm border-0' data-bs-toggle="modal" href="#secondaryModal" data-bs-dismiss="modal"><FaCamera/></a>
      {more&&
      <>
        <button className='btn btn-sm border-0' onClick={toggle}><FaHeading/></button>
        <button className='btn btn-sm border-0' onClick={handleMedia}><FaLink/></button>
        <button className='btn btn-sm border-0' onClick={handleSchedule}><PiTimerFill/></button>
        <button className='btn btn-sm border-0' onClick={handleDisappear}><GiTimeBomb/></button>
        </>
      }

    </div> 
    
    <button type="button" className="btn btn-primary btn-sm" onClick={submitPost}>Post</button>
    <div className='w-100'>
      
    { media&& <input type="text" name='url' id='url' placeholder='Paste your URL here' className='w-100 p-2 border-top-0 border-end-0 border-start-0 shadow-none my-3 form-control' onChange={(e)=>setPostUrl(e.target.value)}/>}

    {schedule&&
    <div className='schedule'>
      <hr />
      <p className='fs-6 fw-medium mt-1'>Schedule The Post</p>
    <DatePicker
         
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          className='p-1 text-black'
          selected={startDate} onChange={(date) => setStartDate(date)}
        />
    </div>
    }
    {disappear&&
        <div className='schedule'>
          <hr />
          <p className='fs-6 fw-medium mt-1'>Disappear in</p>
        <DatePicker
              // selected={scheduleDate}
              showTimeSelect
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className='p-1 text-black'
            />
        </div>
    }

    </div>
    </>
  )
}

export default PostFooter