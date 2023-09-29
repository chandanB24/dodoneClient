import React from 'react'

const PostBody = ({visible,inputValue,handleInputChange,setPostTitle}) => {

  return (
    <div className='col-12'>
            <div className='form-fields w-100'>
                <form >
                {visible&&<input type="text" name='heading' id='heading' placeholder='Enter Title of Post' className='w-100 p-2 border-top-0 border-end-0 border-start-0 shadow-none my-3 form-control' onChange={(e)=>setPostTitle(e.target.value)}/>}
                <textarea type="text" name='post' id='post' placeholder={`What's On Your Mind Write Here?`} className='w-100 p-2 border-0 shadow-none my-3 form-control' rows="6" style={{resize:'none'}} value={inputValue} onChange={(e)=>handleInputChange(e)}/>
                </form>
            </div> 
    </div>
  )
}

export default PostBody