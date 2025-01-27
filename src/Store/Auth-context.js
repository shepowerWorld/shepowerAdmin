import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true"
  );

  const loginHandler = () => {
    sessionStorage.setItem("isLoggedIn", "true");
    setLoggedIn(true);
  };

  const logoutHandler = () => {
    sessionStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: loggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
