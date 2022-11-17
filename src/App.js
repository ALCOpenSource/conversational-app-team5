import React, { useEffect, useContext, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from './components';
import { Accounts, Courses, Home, CreateCourses, CourseDetails } from './pages';

import { AuthContext } from './contexts/ContextProvider';
import { useSnackbar } from 'notistack';
import { auth } from './contexts/auth';
import { GetCourses } from './apis/api';

function App() {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state
  const [courses, setCourses] = useState([]);

  // const [pending, setPending] = useState(true)
  const navigate = useNavigate();
   
  useEffect(() => {
    if(!user) {
      navigate("/register")
    }
  }, [user, navigate]);

  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    const getUser = async () => {
      auth.onAuthStateChanged( user => {
        if (user) {       
          enqueueSnackbar(
            'Log in Successful.',
            { variant: 'success', autoHideDuration: 1000 }
          );     
          dispatch({ type: 'USER_LOGIN', payload: user });
          localStorage.setItem('user', JSON.stringify(user))
          console.log(user)
          // // validateToken()
        } else {
          // user is signed out
        }
      }, (error) => {
        console.log(error);
        enqueueSnackbar(
          'Log in Failed.',
          { variant: 'fail', autoHideDuration: 1000 }
        );
      });
    };
    getUser()

    GetCourses()
    .then((data) => {
      console.log(data);
      dispatch({ type: 'COURSES', payload: data});
      localStorage.setItem('courses', JSON.stringify(data));
      setCourses(data);
    })
    // const unregisterAuthObserver = auth.onAuthStateChanged(user => {
    //   setPending(false);
    //   setCurrentUser(null);
    // });
  
    // return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.


  }, [dispatch, enqueueSnackbar]);

console.log(user)
const accessToken = user.accessToken
localStorage.setItem('token', accessToken);
// console.log(localStorage.getItem('token'));
console.log("Courses:", courses);

  return (
  <div className="flex">
   <Sidebar/>
   <div className="h-screen overflow-y-scroll flex-1 p-7">
    <Navbar user={user}/>
      <Routes>
      <Route exact path="/" element={(<Home />)} />
        <Route path="/courses" element={(<Courses courses={courses}/>)} />
        <Route path="/courses/:id" element={(<CourseDetails />)} />
        <Route path="/create-course" element={(<CreateCourses />)} />
        <Route path="/accounts" element={(<Accounts/>)} />
      </Routes>
   </div>
  </div>
  )
}

export default App;