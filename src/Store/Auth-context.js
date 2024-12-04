import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  IsLoggedIn: false, // Corrected the capitalization here
  onLogin: () => {},
  onLogout : () =>{}
});

export const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("adminLogin") == 1 ? true : false);

 


  const loginHandler = () => {
    sessionStorage.setItem("adminLogin",1)
    setLoggedIn(true);
  };

  const LogoutHandler = () => {
    sessionStorage.clear();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ IsLoggedIn: loggedIn, onLogin: loginHandler ,onLogout :LogoutHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
