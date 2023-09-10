import React, { useEffect, useState } from 'react'
import profile from '../../assets/profile.png'
import PostBox from '../PostBox/PostBox'
import {useLocation} from 'react-router-dom';

const Navbar = () => {

    const [data,setData] = useState(null);
    // const [pageList,setPageList] = useState(null);
    const location = useLocation();
    const match = location.pathname.match(/^\/post\/(\d+)$/);
    const pageId = match ? match[1] : null;

    useEffect(()=>{
      const getData = JSON.parse(localStorage.getItem('userData'));
      
      if(getData){
        setData(getData);
        
        // const pageList = async () =>{  
        //   const res = await axios.get(`http://localhost:8080/api/dashboard/${getData.uid}`);
        //   setPageList(res.data);
        // }

        // pageList();
      }

  },[])

  
 


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm rounded d-flex justify-content-between">
      <span className="navbar-brand mb-0 h1 mx-3">Do Done</span>
      <div className="d-flex align-items-center mx-3 mx-sm-5">
       {/* { pageList&&
        <div className="btn-group mx-3">
          <button className="btn btn-none border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {pageList[0].page_title}
          </button>
          <ul className="dropdown-menu text-dark">
            {pageList&&pageList.map((item)=><Link to={`/post/${item.pid}`} className='dropdown-item' key={item.pid}>{item.page_title}</Link>)}
          </ul>
        </div>
        } */}
       { pageId?<PostBox/>:null}
        <img src={data?data.user_image:profile} className='object-fit-contain rounded-circle' alt='profile' style={{width:'35px',height:'35px'}}/>
      </div>
  </nav>
  )
}

export default Navbar





