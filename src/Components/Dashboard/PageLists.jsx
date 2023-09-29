import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HashLoader from "react-spinners/HashLoader";
import axios from 'axios';

const PageLists = () => {

    const [data,setData] = useState(false);
    const [pageTitle,setPageTitle] = useState(null);
    const [error,setError] = useState(false);
    const {userId} = useParams();
    const push = useNavigate();

    useEffect(()=>{

        const fetchData = async () =>{

        const res = await axios.get(`http://localhost:8080/api/dashboard/${userId}`);
        
        if(res.data.message){
            setData(true)
        }
         else if(res.data){
            console.log(res)
            push(`/post/${res.data[0].pid}`)
        }
        else{
            console.log('error')
        }
        }
        fetchData();
        
    },[userId])

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
    
    <>
      {!data?
      <div>
      <HashLoader/>
      <p className='fs-6 mt-3'>Please wait while we fetch your page</p>
      </div>
      :
      <div className='col shadow-lg rounded-2 p-4 col-12 col-md-6 col-lg-6'>
        <h2 className='text-center'>Create Your Page</h2>
        <div className='form-fields mb-2'> 
          <input type="text" name="page_title" id="page_title" className='form-control' placeholder='enter the title of your page' onChange={(e)=>setPageTitle(e.target.value)} required/>
          {error?<p className='text-danger'>please give title min(3 characters)</p>:null}
        </div>
        <div className='d-flex justify-content-center'>
        <button className='btn btn-danger' onClick={createNewpage}>Create</button>
        </div>
      </div>
      }
    </>
  
  )
}

export default PageLists