import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../contexts/auth'
import { AuthContext } from '../contexts/ContextProvider';

const Home = () => {
  // const { currentUser } = useContext(AuthContext);

  // const navigate = useNavigate();
   
  // useEffect(() => {
  //   if(!currentUser) {
  //     navigate("/register")
  //   }
  // }, [currentUser, navigate]);
  return (
    <div>
       <h2 className='text-2xl font-medium pb-3'>Welcome to Masterminds </h2>
       <p className='text-14'>A conversational learning application that make it easy for users to learn at anytime on socials or web platform</p>
    </div>
  )
}

export default Home