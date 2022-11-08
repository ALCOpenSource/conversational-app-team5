import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

function Login(props) {
    const [userSignedIn, setUserSignedIn] = React.useState(false);
    const elementRef = React.useRef(null);

    React.useEffect(() => {
        const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(props.firebaseAuth);
        if (props.uiConfig.signInFlow === 'popup')
            firebaseUiWidget.reset();

        if (props.uiConfig.signInFlow === 'popup')
            firebaseUiWidget.reset();

        // We track the auth state to reset firebaseUi if the user signs out.
        const unregisterAuthObserver = onAuthStateChanged(props.firebaseAuth, (user) => {
            if (!user && userSignedIn) {
              firebaseUiWidget.reset();
            }
            setUserSignedIn(!!user);
        });

        // Trigger the callback if any was set.
        if (props.uiCallback) {
          props.uiCallback(firebaseUiWidget);
        }

        firebaseUiWidget.start(elementRef.current, props.uiConfig);

        return () => {
          unregisterAuthObserver(); 
          firebaseUiWidget.reset();
        };
    }, [props, userSignedIn, props.uiConfig]);

    return <div className={props.className} ref={elementRef} />;
};

export default Login;