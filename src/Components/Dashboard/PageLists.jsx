import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const PageLists = () => {

    const [data,setData] = useState();
    const {userId} = useParams();

    useEffect(()=>{

        const fetchData = async () =>{

        const res = await axios.get(`http://localhost:8080/api/dashboard/${userId}`);
        
        if(res){
            setData(res.data);
        }
        else{
            console.log('data not found');
        }

        }
        fetchData();
        
    },[userId])


  return (
    <div className="row">

    {   data&&data.map((item)=>( 
        <div className="col-sm-6 mb-3" key={item.pid}>
            <div className="card border-0 shadow-md h-100">
            <div className="card-body">
                <h5 className="card-title" style={{fontFamily:'Poppins',fontWeight:'lighter 300',color:'#18181B'}}>{item.page_title}</h5>
                <p className="card-text" style={{fontFamily:"Poppins",fontSize:"16px",fontWeight:'Extralight 200',color:'#71717A'}}>{item.page_description}</p>
                <Link to={`/post/${item.pid}`} className='btn btn-danger'>view</Link>
            </div>
            </div>
        </div>
    ))
       
    }
      
    </div>
  )
}

export default PageLists