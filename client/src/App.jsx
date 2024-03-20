import FirstPage from "./pages/FirstPage/FirstPage.jsx";
import Login from "./pages/LoginPage/Login.jsx";
import SignUp from "./pages/SignUpPage/SignUp.jsx";
import AccessDenied from "./pages/AccessDeniedPage/AccessDenied.jsx";
import Home from "./pages/HomePage/Home.jsx";
import GenresPage from "./pages/GenresPage/GenresPage.jsx";
import SectionPage from "./pages/SectionPage/SectionPage.jsx";
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import MoviePage from "./pages/MoviePage/MoviePage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import UserListsPage from "./pages/UserListsPage/UserListsPage.jsx";
import "./index.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from "./states/log.js";
import axios from "axios";

function App() {
  const { isLoggedIn } = useSelector((state) => state.logState);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("https://flickpicks-6ifw.onrender.com/checkToken")
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
  }, [dispatch]);

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
        <Route
          path="/genres/:genresName"
          element={
            !isLoggedIn ? (
              <AccessDenied isLoggedIn={isLoggedIn} />
            ) : (
              <GenresPage />
            )
          }
        />
        <Route
          path="/discover/movies/:section"
          element={
            !isLoggedIn ? (
              <AccessDenied isLoggedIn={isLoggedIn} />
            ) : (
              <SectionPage />
            )
          }
        />
        <Route
          path="/discover/search"
          element={
            !isLoggedIn ? (
              <AccessDenied isLoggedIn={isLoggedIn} />
            ) : (
              <SearchPage />
            )
          }
        />
        <Route
          path="/movie/:movieID"
          element={
            !isLoggedIn ? (
              <AccessDenied isLoggedIn={isLoggedIn} />
            ) : (
              <MoviePage />
            )
          }
        />
        <Route
          path="/profile/:id"
          element={
            !isLoggedIn ? (
              <AccessDenied isLoggedIn={isLoggedIn} />
            ) : (
              <ProfilePage />
            )
          }
        />
        <Route
          path="/profile/:id/:list"
          element={
            !isLoggedIn ? (
              <AccessDenied isLoggedIn={isLoggedIn} />
            ) : (
              <UserListsPage />
            )
          }
        />
        <Route path="*" element={<AccessDenied isLoggedIn={isLoggedIn} />} />
      </Routes>
    </>
  );
}
export default App;
