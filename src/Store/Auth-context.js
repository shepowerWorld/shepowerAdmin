// AuthContext.js
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';

/**
 * Authentication context with default values
 * @type {React.Context}
 */
const AuthContext = React.createContext({
  isLoggedIn: false,
  isLoading: true,
  token: null,
  onLogin: (token) => {},
  onLogout: () => {},
});

/**
 * Authentication Context Provider Component
 */
export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  // Initialize auth state from storage
  useEffect(() => {
    try {
      const storedToken = sessionStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Error accessing sessionStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handler for logging in
  const loginHandler = useCallback((authToken) => {
    try {
      if (!authToken) {
        throw new Error("No auth token provided");
      }
      sessionStorage.setItem("authToken", authToken);
      setToken(authToken);
      setLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }, []);

  // Handler for logging out
  const logoutHandler = useCallback(() => {
    try {
      sessionStorage.removeItem("authToken");
      setToken(null);
      setLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup if needed
    };
  }, []);

  const contextValue = {
    isLoggedIn: loggedIn,
    isLoading,
    token,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes validation
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
