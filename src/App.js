import React, { useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from './components';
import { Accounts, Courses, Home } from './pages';

import { AuthContext } from './contexts/ContextProvider';

function App() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
   
  useEffect(() => {
    if(!currentUser) {
      navigate("/register")
    }
  }, [currentUser, navigate]);

  return (
  <div className="flex">
   <Sidebar/>
   <div className="h-screen flex-1 p-7">
    <Navbar currentUser={currentUser}/>
      <Routes>
      <Route exact path="/" element={(<Home />)} />
        <Route path="/courses" element={(<Courses/>)} />
        <Route path="/accounts" element={(<Accounts/>)} />
      </Routes>
   </div>
  </div>
  )
}

export default App;