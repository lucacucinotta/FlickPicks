import { Route, Routes, Navigate } from "react-router-dom";
import FirstPage from "./pages/FirstPage/FirstPage.jsx";
import Login from "./pages/LoginPage/Login.jsx";
import SignUp from "./pages/SignUpPage/SignUp.jsx";
import AccessDenied from "./pages/accessDeniedPage/AccessDenied.jsx";
import Home from "./pages/homePage/Home.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./index.scss";

function App() {
  const { isLoggedIn } = useSelector((state) => state.logState);
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8081/check-token")
      .then((res) => {
        if (res.status === 200) {
          console.log(`Token check result : ${res.status}`);
          localStorage.setItem("auth", JSON.stringify(true));
        }
      })
      .catch((err) => {
        console.error(err);
        localStorage.setItem("auth", JSON.stringify(false));
      });
  }, [isLoggedIn]);
  const isAuthenticated = JSON.parse(localStorage.getItem("auth"));
  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <FirstPage />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate replace to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate replace to={"/"} /> : <SignUp />}
        />
        <Route
          path="*"
          element={<AccessDenied isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </>
  );
}
export default App;
