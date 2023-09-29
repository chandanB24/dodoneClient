import React from 'react'
import {GrAdd} from 'react-icons/gr'
import PostBoxModal from './PostBoxModal'

const PostBox = () => {
  
  return (
 <>
    <a type="button" className="btn mx-2 " data-bs-toggle="modal" href="#exampleModal">
      <GrAdd/>
    </a>
    <PostBoxModal />
    </>
  )
}

export default PostBox