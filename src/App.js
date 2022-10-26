import React from 'react';
import SignIn from './auth/signin';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


// Configure Firebase.
const config = {
  apiKey: "APPID",
  authDomain: "masterminds-9786b.firebaseapp.com",
  projectId: "masterminds-9786b",
  storageBucket: "masterminds-9786b.appspot.com",
  messagingSenderId: "651708189533",
  appId: "1:651708189533:web:c35688e35b055069c576b4",
  measurementId: "G-G805F4B5HZ"
};

// Initialize Firebase
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  React.useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (isSignedIn) {
    return (<div className='container mx-auto font-bold text-3xl'>
      <h1>My App</h1>
      <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
      <a href='#' onClick={() => firebase.auth().signOut()}>Sign-out</a>
    </div>)
  }

  return (
    <SignIn
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
      className=""
    />
  )
}

export default App
