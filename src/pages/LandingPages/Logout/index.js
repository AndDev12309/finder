import LoadingSpinner from "components/Loading/LoadingSpinner";
import API from "data";
import withAuth from "hocs/withAuth";
import Cookies from "js-cookie";
import { useAuth } from "providers/Auth";
import { useEffect } from "react";

const Logout = () => {
  const { setAuthenticated, setCurrentUser, isAuthenticated } = useAuth();
  useEffect(() => {
    function doLogout() {
      try {
        // console.log('loggin out');
        Cookies.remove("token");
        delete API.headers["Authorization"];
        window.localStorage.setItem("login", JSON.stringify(false));
        setAuthenticated(false);
        setCurrentUser(null);
      } catch (e) {
        // console.log('e', e);
      }
    }
    doLogout();
  }, [isAuthenticated]);
  return <LoadingSpinner />;
};

export default withAuth(Logout, "/presentation");
