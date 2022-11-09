
import React, { createContext, useEffect, useState, useContext,  useReducer  } from "react";
import { FadeLoader } from "react-spinners";
import { auth } from "./auth";
import { useSnackbar } from 'notistack';

export const AuthContext = createContext();

const initialState = {
  user: localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null,
};

export function useAuth() {
  return useContext(AuthContext)
}

function reducer(state, action) {
  console.log(action.payload);
  switch (action.type) {
    case 'USER_LOGIN':
        return { ...state, user: action.payload };
        default:
         return state;
    case 'USER_LOGOUT':
      return {
          ...state,
          user: null,
        };    
      }
  };

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  // const [pending, setPending] = useState(true);

  const { enqueueSnackbar } = useSnackbar();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getUser = async () => {
      auth.onAuthStateChanged( user => {
        if (user) {
          enqueueSnackbar(
            'Log in Successful.',
            { variant: 'success', autoHideDuration: 500 }
          );     
          console.log(user)
          // User is signed in.
          // console.log( user.displayName );
          // console.log( user.email );
          // console.log( user.emailVerified );
          // console.log( user.photoURL );
          // console.log( user.uid );
          // console.log( user.phoneNumber );
          // console.log( user.providerData );
          setCurrentUser(user);
          localStorage.setItem('user', JSON.stringify(user))
          // // validateToken();
        } else {
          // user is signed out
        }
      }, (error) => {
        console.log(error);
        enqueueSnackbar(
          'Log in Failed.',
          { variant: 'fail', autoHideDuration: 15000 }
        );
      });
    };
    getUser();

    // const unregisterAuthObserver = auth.onAuthStateChanged(user => {
    //   setPending(false);
    //   setCurrentUser(null);
    // });
  
    // return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [currentUser, enqueueSnackbar]);

console.log(currentUser);

  // if (pending) {
  //   return(
  //     <div className="pt-5 flex justify-center items-center text-center w-full h-full">
  //       <FadeLoader
  //        color="#0F1926"
  //        style={{"margin":"5px", "textAlign": "center"}}
  //        size={200} />
  //     </div>
  //   )
  // }

  const value = {
    currentUser,
  }

  return (
    <AuthContext.Provider
    value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

