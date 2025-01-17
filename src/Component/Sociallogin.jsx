import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const Sociallogin = () => {
    const {  googleSingin} = useAuth();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const handleGoogle=()=>{
      googleSingin()
      .then(result=>{
        console.log(result.user);
        const userinfo = {
          email:result.user?.email,
          name: result.user.displayName
        }
        axiosPublic.post('/users', userinfo)
        .then(res=>{
           console.log(res);
           navigate('/');
        })
      })
    }
    return (
        <div>
              <div className="divider">OR</div>
             <div className='flex justify-center items-center mt-5'>
            <button className="btn w-full" onClick={ handleGoogle}>
            <FaGoogle></FaGoogle>Google login
</button> 
        </div>
        </div>
    );
};

export default Sociallogin;