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
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import AuthenticatedRoute from "./utils/AuthenticatedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route element={<AuthenticatedRoute />}>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/discover/genres/:genre" element={<GenresPage />} />
        <Route path="/discover/charts/:section" element={<SectionPage />} />
        <Route path="/discover/search" element={<SearchPage />} />
        <Route path="/movies/:movieID" element={<MoviePage />} />
        <Route path="/users/:id" element={<ProfilePage />} />
        <Route path="/users/:id/lists/:list" element={<UserListsPage />} />
      </Route>
      <Route path="*" element={<AccessDenied />} />
    </Routes>
  );
}
export default App;
