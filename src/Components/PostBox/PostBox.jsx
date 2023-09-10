import React from 'react'
import {GrAdd} from 'react-icons/gr'
import PostBoxModal from './PostBoxModal'

const PostBox = () => {
  return (
 <>
    <button type="button" className="btn mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <GrAdd/>
    </button>
    <PostBoxModal/>
    </>
  )
}

export default PostBox