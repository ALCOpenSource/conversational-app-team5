import React from 'react'
import { auth } from '../contexts/auth'

const Home = () => {
  return (
    <div>
      Home
      <p>Welcome {auth.currentUser.displayName}! You are now signed-in!</p>
    </div>
  )
}

export default Home