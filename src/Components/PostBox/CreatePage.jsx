import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {

    const [pageTitle,setPageTitle] = useState(null);
    const [error,setError] = useState(false);
    const [userId,setUserId] = useState();
    const push = useNavigate()

    useEffect(()=>{
        const getData = JSON.parse(localStorage.getItem('userData'));

        if(getData){
            setUserId(getData.uid)
        }
    },[])


    const createNewpage = async () =>{
      
        if(!pageTitle){
          setError(true);   
      }
      else{
        try{
          const res = await axios.post(`http://localhost:8080/api/createPage`,{pageTitle,uid:userId})
          if(res){
            push(`/post/${res.data.pid}`)
            window.location.reload()
          }
        }
        catch(err){
          console.log(err);
        }
      }
      }


  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
        <div className='col shadow-lg rounded-2 p-4 col-12 col-md-6 col-lg-6'>
        <h2 className='text-center'>Create Your Page</h2>
        <div className='form-fields mb-2'> 
        <input type="text" name="page_title" id="page_title" className='form-control' placeholder='enter the title of your page' onChange={(e)=>setPageTitle(e.target.value.replace(/\s/g, '').toLowerCase())} required/>
        {error?<p className='text-danger'>please give title min(3 characters)</p>:null}
        </div>
        <div className='d-flex justify-content-center'>
        <button className='btn btn-danger' onClick={createNewpage}>Create</button>
        </div>
    </div>
  </div>
  )
}

export default CreatePage