import React, { useContext } from 'react'
import { auth } from '../contexts/auth'
import { AuthContext } from '../contexts/ContextProvider';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
       <h2> Home</h2>
  
     </div>
  )
}

export default Home