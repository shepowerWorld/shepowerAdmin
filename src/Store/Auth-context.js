// AuthContext.js
import React, { useState } from "react";

// Create the context with a default value
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
});

// AuthContextProvider component
export const AuthContextProvider = (props) => {
  // Get the initial login state from sessionStorage
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true"
  );

  // Handler for logging in
  const loginHandler = () => {
    sessionStorage.setItem("isLoggedIn", "true");
    setLoggedIn(true);
  };

  // Handler for logging out
  const logoutHandler = () => {
    sessionStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
  };

  // Provide context value to children components
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: loggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
