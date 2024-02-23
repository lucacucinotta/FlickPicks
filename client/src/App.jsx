import { Route, Routes, Navigate } from "react-router-dom";
import FirstPage from "./pages/FirstPage/FirstPage.jsx";
import Login from "./pages/LoginPage/Login.jsx";
import SignUp from "./pages/SignUpPage/SignUp.jsx";
import AccessDenied from "./pages/accessDeniedPage/AccessDenied.jsx";
import Home from "./pages/homePage/Home.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from "./states/log.js";
import axios from "axios";
import "./index.scss";

function App() {
  const { isLoggedIn } = useSelector((state) => state.logState);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8081/check-token")
      .then((res) => {
        if (res.status === 200) {
          console.log(`Token check result : ${res.status}`);
          dispatch(logIn());
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(logOut());
      });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <FirstPage />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate replace to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate replace to={"/"} /> : <SignUp />}
        />
        <Route path="*" element={<AccessDenied isLoggedIn={isLoggedIn} />} />
      </Routes>
    </>
  );
}
export default App;
