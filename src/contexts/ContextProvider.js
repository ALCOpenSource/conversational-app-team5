
import React, { useEffect, useState, useContext } from "react";
import { validateToken,  auth } from "./auth";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (currentUser) {
      console.log();
      console.log(currentUser);
      validateToken();
  }
  const unregisterAuthObserver = auth.onAuthStateChanged(user => {
    setCurrentUser(!!user);
  });
  
  return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.

 }, [currentUser]);

  // if(pending){
  //   return <>Loading...</>
  // }

  if (currentUser) {
    console.log();
    console.log(currentUser);

    // return (<div className='container mx-auto font-bold text-3xl'>
    //   <h1>My App</h1>
    //   <p>Welcome {app.auth().currentUser.displayName}! You are now signed-in!</p>
    //   <a href='/' onClick={() => app.auth().signOut()}>Sign-out</a>
    // </div>)
  }

  const value = {
    currentUser,
    // login,
    // signup,
    // logout,
    // resetPassword,
    // updateEmail,
    // updatePassword
  }

  

  return (
    <AuthContext.Provider
    value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

