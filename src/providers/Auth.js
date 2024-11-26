import React, { useEffect } from "react";
import PropTypes from "prop-types";
import API from "../data";
import Cookies from "js-cookie";
import Routes from "constants/routes";
import history from "utils/history";

const AuthContext = React.createContext({
  isAuthenticated: false,
  setAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      window.addEventListener("storage", syncLogout);
      console.log("added storage event");

      const token = !!Cookies.get("token");
      if (token) {
        try {
          const currentUserResponse = await API.get("/users/me");
          setCurrentUser(currentUserResponse && currentUserResponse.data);
          setAuthenticated(true);
        } catch (e) {
          history.push(Routes.LOGOUT);
          window.localStorage.removeItem("login");
          Cookies.remove("token");
          delete API.headers["Authorization"];
          setAuthenticated(false);
          setCurrentUser(null);
          window.location.reload();
        }
      }
      setIsCheckingAuth(false);

      return () => {
        setAuthenticated(false);
        history.push(Routes.LOGOUT);
        window.localStorage.removeItem("login");
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("login");
        Cookies.remove("token");
        setCurrentUser(null);
        delete API.headers["Authorization"];
      };
    };

    initializeAuth();
  }, []);

  const syncLogout = (event) => {
    console.log("event", event);

    if (event.key === "login") {
      console.log("login from storage!");
      window.location.reload();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isCheckingAuth,
        setAuthenticated,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Definimos los PropTypes para AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
