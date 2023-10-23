import React, { useEffect, useState } from 'react'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostImageSelect from './PostImageSelect'
import axios from 'axios'



const PostBoxModal = () => {

  const [heading,setHeading] = useState(false)
  const [postTitle,setPostTitle] = useState(null);
  const [postUrl,setPostUrl] = useState(null);
  const [ytUrl,setYtUrl] = useState(null);
  const [imageUrl,setImageUrl] = useState(null);
  const [inputvalue,setInputvalue] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [startDate,setStartdate] = useState()
  const timeStamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const pathArray = window.location.pathname.split('/');
  const pageId = pathArray[pathArray.length-1];




  const toggleHeading = ()=>{
    setHeading(!heading)
  }
  
  const handleInputChange = (e)=>{
    const newValue = e.target.value;

    if(newValue.length <= 200){
      setInputvalue(newValue)
    }
  }

  const submitPost = async (e) =>{
      e.preventDefault()
      const data  = {pid:pageId,postTitle,postBody:inputvalue,postUrl,ytUrl,timeStamp,imageUrl};
      console.log(data)

      if((postTitle || inputvalue) || (imageUrl || ytUrl)){
      try{  
      const res = await axios.post('http://localhost:8080/api/createPost',data);
      if(res){
        console.log(res);
        window.location.reload();
      }
      }
      catch(err){
        console.log(err);
      }
    }
  }




const schedulePost = async (scheduleDate) => {
  setStartdate(scheduleDate)
  const currentDate = new Date();
  if (currentDate >= scheduleDate) {
    if (!isScheduled) {
      setIsScheduled(true);
      const data  = {pid:pageId,postTitle,postBody:inputvalue,postUrl,ytUrl,timeStamp,imageUrl};
      console.log(data)

      if((postTitle || inputvalue) || (imageUrl || ytUrl)){
      try{  
      const res = await axios.post('http://localhost:8080/api/createPost',data);
      if(res){
        console.log(res);
        window.location.reload();
      }
      }
      catch(err){
        console.log(err);
      }
    }
    }
  }
}

useEffect(() => {
  if (isScheduled) {
    
    return;
  }


  const intervalId = setInterval(() => {
    schedulePost(startDate);
  }, 2000);

  return () => {
    clearInterval(intervalId); 
  };
}, [isScheduled, startDate]);



 
  return (
    <>
    <div className="modal fade" id="exampleModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
    <div className="modal-dialog modal-dialog-centered" >
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Do Done</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <PostBody visible={heading} inputValue={inputvalue} handleInputChange={handleInputChange} setPostTitle={setPostTitle}/>
        </div>
        <div className="modal-footer d-flex justify-content-between align-items-center">
         <PostFooter toggle={toggleHeading} setPostUrl={setPostUrl} submitPost={submitPost} schedulePost={schedulePost}/>
        </div>
      </div>
    </div>
  </div>
    <PostImageSelect setImageUrl={setImageUrl} setYtUrl={setYtUrl}/>
  </>
  )
}

export default PostBoxModal