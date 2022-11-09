import React, { useContext } from 'react'
import { auth } from '../contexts/auth'
import { AuthContext } from '../contexts/ContextProvider';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
       <h2 className='text-2xl font-medium pb-3'>Welcome to Masterminds </h2>
       <p className='text-14'>A conversational learning application that make it easy for users to learn at anytime on socials or web platform</p>
    </div>
  )
}

export default Home