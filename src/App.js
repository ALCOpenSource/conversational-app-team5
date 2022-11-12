import React, { useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from './components';
import { Accounts, Courses, Home } from './pages';

import { AuthContext } from './contexts/ContextProvider';
import { useSnackbar } from 'notistack';
import { auth } from './contexts/auth';

function App() {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state

  // const [pending, setPending] = useState(true)
  const navigate = useNavigate();
   
  useEffect(() => {
    if(!user) {
      navigate("/register")
      localStorage.setItem("user", JSON.stringify())
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
          // User is signed in.
          // console.log( user.displayName)
          // console.log( user.email)
          // console.log( user.emailVerified)
          // console.log( user.photoURL)
          // console.log( user.uid)
          // console.log( user.phoneNumber)
          // console.log( user.providerData)
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
    getUser();

    // const unregisterAuthObserver = auth.onAuthStateChanged(user => {
    //   setPending(false);
    //   setCurrentUser(null);
    // });
  
    // return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [dispatch, enqueueSnackbar]);

console.log(user)

  return (
  <div className="flex">
   <Sidebar/>
   <div className="h-screen flex-1 p-7">
    <Navbar user={user}/>
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