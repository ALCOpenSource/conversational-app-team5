import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/ContextProvider";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
            <Navigate to="/register" />
        )
      }
    />
  );
};


export default PrivateRoute