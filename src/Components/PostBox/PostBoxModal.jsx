import React, { useState } from 'react'
import PostBody from './PostBody'
import PostFooter from './PostFooter'

const PostBoxModal = () => {

  const [heading,setHeading] = useState(false)
  

  const toggleHeading = ()=>{
    setHeading(!heading)
  }

// for input characters restriction

  const [inputvalue,setInputvalue] = useState();
  

  const handleInputChange = (e)=>{
    const newValue = e.target.value;

    if(newValue.length <= 200){
      setInputvalue(newValue)
    }
  }


  return (
    <div className="modal  fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
    <div className="modal-dialog modal-dialog-centered" >
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Do Done</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <PostBody visible={heading} inputValue={inputvalue} handleInputChange={handleInputChange} />
        </div>
        <div className="modal-footer d-flex justify-content-between align-items-center">
         <PostFooter toggle={toggleHeading}/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PostBoxModal