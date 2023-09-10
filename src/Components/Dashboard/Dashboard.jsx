import React from 'react'
import { useNavigate } from 'react-router-dom';
import PageLists from './PageLists';

const Dashboard = () => {

    // const [userdata,setUserData] = useState(null);
    const push = useNavigate();

    // useEffect(()=>{
    //     const getData = JSON.parse(localStorage.getItem('userData'));

    //     if(getData){
    //         setUserData(getData);
    //     }
    // },[])

    const handleLogout = () =>{
        localStorage.removeItem('userData');
        push('/');
        window.location.reload(false);
    }


  return (
    <div className='p-2 my-5' style={{height:'90vh'}}>
       <div className='d-flex justify-content-between align-items-center'>
        <h4>Page Lists</h4>
            <div>
            <button className='btn btn-danger mx-2' onClick={handleLogout}>Logout</button>
            <button className='btn btn-primary mx-2'>Create</button>
            </div>
       </div>
       <div className='my-5'>
            <PageLists/>
       </div>
    </div>
  )
}

export default Dashboard