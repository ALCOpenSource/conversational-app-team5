import React, { useContext, useEffect } from 'react';
import logo from '../assets/logo.png'
import Login from './Login';
import { auth, uiConfig } from '../contexts/auth';
import { AuthContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { state } = useContext(AuthContext);
  const { user } = state


  const navigate = useNavigate();
   
  useEffect(() => {
    if(user) {
      navigate("/")
    }
  }, [user, navigate]);


  return (
    <div className="container mx-auto flex items-center min-h-screen p-6 justify-center">
    <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl'>
    <div className='flex flex-col overflow-y-auto md:flex-row'>
    <div className='h-32 md:h-auto md:w-1/2'>
           <img src={logo} className="object-cover  w-full h-full" alt='logo' />   
    </div>
    <div className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
    <div className='w-full'>
    <h1 className='mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Welcome!!!</h1>
    <p className='mb-5 text-[#2D2D2D] font-light text-sm'>MasterMinds provides you with the best learning platform</p>
    <div className='p-10 cursor-pointer'>
    <Login
      uiConfig={uiConfig}
      firebaseAuth={auth}
      className=""
    />
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Register