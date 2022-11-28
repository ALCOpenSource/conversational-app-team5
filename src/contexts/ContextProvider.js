
import React, { createContext, useContext,  useReducer  } from "react";
import { useSnackbar } from 'notistack';

export const AuthContext = createContext();

const initialState = {
  loading: true,
  user: localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null,
  courses: localStorage.getItem('courses')
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
      return { ...state, user: action.payload, loading: false };
    case 'USER_LOGOUT':
      return {
          ...state,
          user: null,
          loading: true
        };  
    case 'COURSES':
      return { ...state, courses: action.payload, loading: false }; 
    default:
      return state;
  }
};


export const AuthProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState({})
  // const [pending, setPending] = useState(true)

  const [state, dispatch] = useReducer(reducer, initialState)


  // useEffect(() => {
  //   const getUser = async () => {
  //     auth.onAuthStateChanged( user => {
  //       if (user) {
  //         localStorage.setItem('user', JSON.stringify(user))
  //         enqueueSnackbar(
  //           'Log in Successful.',
  //           { variant: 'success', autoHideDuration: 1000 }
  //         );     
  //         // setCurrentUser(user)
  //         console.log(user)
  //         // User is signed in.
  //         // console.log( user.displayName)
  //         // console.log( user.email)
  //         // console.log( user.emailVerified)
  //         // console.log( user.photoURL)
  //         // console.log( user.uid)
  //         // console.log( user.phoneNumber)
  //         // console.log( user.providerData)
  //         // // validateToken()
  //       } else {
  //         // user is signed out
  //       }
  //     }, (error) => {
  //       console.log(error);
  //       enqueueSnackbar(
  //         'Log in Failed.',
  //         { variant: 'fail', autoHideDuration: 1000 }
  //       );
  //     });
  //   };
  //   getUser();

  //   // const unregisterAuthObserver = auth.onAuthStateChanged(user => {
  //   //   setPending(false);
  //   //   setCurrentUser(null);
  //   // });
  
  //   // return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  // }, [enqueueSnackbar]);

// console.log(currentUser);

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

  
    // return () => unregisterAuthObserver();
     // Make sure we un-register Firebase observers when the component unmounts.
  const value = {
    state, dispatch
  }

  return (
    <AuthContext.Provider
    value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

