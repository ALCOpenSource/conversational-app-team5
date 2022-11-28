import React, { useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Accounts, Courses, Home, CreateCourses, CourseDetails } from './pages';
import { AuthContext } from './contexts/ContextProvider';
import { getUserOrNull } from './contexts/auth';
import { Navbar, Sidebar, Spinner } from './components';
import './App.css';

function App() {
  const { state, dispatch } = useContext(AuthContext);
  const { loading, user } = state;

  const navigate = useNavigate();

  useEffect( () => {
    getUserOrNull().then( (_user) => {
      if(_user !== null) {
        dispatch({ type: 'USER_LOGIN', payload: _user });
      } else {
        navigate("/register");
      }
    } ).catch( (error) => {
      console.log(error);
    } )

  }, [dispatch, navigate]);
  
  if (user !== null && user !== undefined) {
    console.log(user)
    // const accessToken = user._delegate.accessToken
    // localStorage.setItem('token', accessToken);
  }


  return (
    loading ? <Spinner/> :
  <div className="flex">
    <Sidebar/>
    <div className="h-screen overflow-y-scroll flex-1 p-7">
      <Navbar user={user}/>
        <Routes>
        <Route exact path="/" element={(<Home />)} />
          <Route path="/courses" element={(<Courses />)} />
          <Route path="/courses/:id" element={(<CourseDetails />)} />
          <Route path="/create-course" element={(<CreateCourses />)} />
          <Route path="/accounts" element={(<Accounts/>)} />
        </Routes>
    </div>
  </div>
  )
}

export default App;