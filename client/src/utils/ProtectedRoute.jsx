import { Outlet, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import AccessDenied from "../pages/AccessDeniedPage/AccessDenied";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        axios.defaults.withCredentials = true;
        await axios.get("https://flickpicks-6ifw.onrender.com/auth");
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
        console.log(err);
      }
    };

    checkAuth();
  }, [location]);

  if (isAuth === null) {
    return <LoadingSpinner />;
  }

  return isAuth ? <Outlet /> : <AccessDenied />;
}
