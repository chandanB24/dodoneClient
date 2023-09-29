import React, { useEffect, useState } from 'react'
import {listAll,ref,getDownloadURL} from 'firebase/storage'
import {storage} from '../../firebase' 

const PostImageSelect = ({setImageUrl,setYtUrl}) => {

    const [imageList,setImageList] = useState([]);
    const imageListRef = ref(storage,"/")

    useEffect(()=>{
        listAll(imageListRef).then((response)=>[
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev,url])
                })
            })
        ])
    },[])

    const handleImageClick = (url) =>{
        setImageUrl(url);
    }

  return (
    
    <div className="modal fade" id="secondaryModal" aria-hidden="true" aria-labelledby="secondaryModelLabel" tabIndex='-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="secondaryModalLabel">Please select any one image</h5>
                    <button type="button" className="btn-close" data-bs-target="#exampleModal" data-bs-toggle="modal" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="row g-2">
                        {imageList&&imageList.map((url)=>(
                        <div className="col-4" key={url}>
                        <img src={url} alt="Imag5" className="img-thumbnail" style={{ cursor: 'pointer' }}   onClick={()=>handleImageClick(url)} data-bs-target="#exampleModal" data-bs-toggle="modal" data-bs-dismiss="modal" />
                        </div>
                        ))}           
                    </div>
                </div>
                <p className='text-center'>OR</p>
                <div className='modal-footer'>
                <input type="text" name='yt' id='yt' placeholder='Paste your Youtube URL here' className='w-100 p-2 border-top-0 border-end-0 border-start-0 shadow-none my-3 form-control' onChange={(e)=>setYtUrl(e.target.value)}/>
                </div>
            </div>
        </div>
    </div>


  )
}

export default PostImageSelect