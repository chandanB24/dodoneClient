import React, { useEffect, useState } from 'react'
import profile from '../../assets/profile.png'
import PostBox from '../PostBox/PostBox'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';


const Navbar = () => {

    const [data,setData] = useState(null);
    const [pageList,setPageList] = useState(null);
    const [selectedPage,setSelectedPage] = useState(null);
    const location = useLocation();
    const match = location.pathname.match(/^\/post\/(\d+)$/);
    const pageid = match ? match[1] : null;
    const push = useNavigate()

    useEffect(()=>{
      const getData = JSON.parse(localStorage.getItem('userData'));
      
      if(getData){
        setData(getData);
        
        const pageList = async () =>{  
          const res = await axios.get(`http://localhost:8080/api/dashboard/${getData.uid}`);
          setPageList(res.data);
        }

        pageList();
      }

  },[])

  const handleClick = (pageTitle) =>{
    setSelectedPage(pageTitle)
  }


// Find the selected page object based on the selectedPage value
  const selectedPageObject = pageList ? pageList.find((item) => item.page_title === selectedPage) : null;

  // Extract the pid if the selectedPageObject exists
  const selectedPageId = selectedPageObject ? selectedPageObject.pid : (pageList && pageList.length > 0 ? pageList[0].pid : null);

// Now you can use selectedPageId as needed



// Now you can use selectedPageId as needed


  const handleLogout = () =>{
    localStorage.removeItem('userData');
    push('/');
    window.location.reload(false);
}
 


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm rounded d-flex justify-content-between">
      <span className="navbar-brand mb-0 h1 mx-3">Do Done</span>
      <div className="d-flex align-items-center mx-3 mx-sm-5">
       { pageList&&pageList.length > 0 ?
        (<div className="btn-group">
         {pageid? <button className="btn btn-none border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {selectedPage || (pageList[0] && pageList[0].page_title)}
          </button>:null}
          <ul className="dropdown-menu text-dark">
          {pageList?pageList.map((item) => (
                  <li key={item.pid}>
                    <Link
                      to={`/post/${item.pid}`}
                      className="dropdown-item"
                      onClick={() => handleClick(item.page_title)}
                    >
                      {item.page_title}
                    </Link>
                  </li>
                )):null}
                <Link to='/createPage' className='dropdown-item'>New Page</Link>
          </ul>
        </div>)
        :null}
       { pageid?<PostBox/>:null}
        {pageid?<div className="btn-group">
        <button className="btn btn-none border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        { pageid?<img src={data?data.user_image:profile} className='object-fit-contain rounded-circle mx-2' alt='profile' style={{width:'35px',height:'35px'}}/>:null}
        </button>
        <ul className="dropdown-menu text-dark">
        <li><Link className='dropdown-item' to={`/createProfile/${selectedPageId}`}>profile</Link></li>
          <li className='dropdown-item'>settings</li>
          <li className='dropdown-item' onClick={handleLogout}>logout</li>
        </ul>
        </div>:null}
      </div>
  </nav>
  )
}

export default Navbar





