import React from 'react'
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    
    const push = useNavigate()  

    const handleResponse = async (response) =>{
    const decode = await jwt_decode(response.credential);
     
       
        try{
        const res = await axios.post('http://localhost:8080/api/create',{name:decode.name,email:decode.email,imageURL:decode.picture});

        if(res)
        {
            localStorage.setItem('userData',JSON.stringify(res.data));
            // console.log(res.data)
            push(`/dashboard/${res.data.uid}`);
            window.location.reload(false);
        }
    }
    catch(err){
        console.log(err);
    }
    }

    const handleError = () =>{
        console.log('Login Failed');
    }



  return (
    <div className='container-fluid d-flex justify-content-center  align-items-center flex-column mt-2' style={{height:'90vh'}}>
            <h1 className='text-center' style={{fontSize:'4rem'}}>"Welcome to Do Done Everything is Under a single tap"</h1>
            <div className='d-flex justify-content-center'>
            <GoogleOAuthProvider clientId="494372254103-gm4uqgj7on9lnn24ed3de400vqnlkuet.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleResponse}
                onError={handleError}
                useOneTap
                />
            </GoogleOAuthProvider>
            </div>
    </div>
  )
}

export default Auth