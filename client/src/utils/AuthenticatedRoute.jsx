import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

export default function AuthenticatedRoute() {
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
      }
    };

    checkAuth();
  }, [location]);

  if (isAuth === null) {
    return <LoadingSpinner />;
  }

  return isAuth ? <Navigate to="/home" /> : <Outlet />;
}
