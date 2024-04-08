import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Cookies from "js-cookie";

export default function AuthenticatedRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  if (isLoggedIn === null) {
    return <LoadingSpinner />;
  }

  return isLoggedIn ? <Navigate to="/home" /> : <Outlet />;
}
