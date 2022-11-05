
import React, { useEffect, useState, useContext } from "react";
import { auth } from "./auth";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  function signup(email, password, name) {
    return createUserWithEmailAndPassword(auth, email, password, name)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth ,email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setPending(false)
    });
    return unsubscribe
  }, []);

  if(pending){
    return <>Loading...</>
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  

  return (
    <AuthContext.Provider
    value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

