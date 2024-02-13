import { Route, Routes } from "react-router-dom";
import FirstPage from "./pages/FirstPage/FirstPage.jsx";
import Login from "./pages/LoginPage/Login.jsx";
import SignUp from "./pages/SignUpPage/SignUp.jsx";
import AccessDenied from "./pages/accessDeniedPage/accessDenied.jsx";
import "./index.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<AccessDenied />} />
    </Routes>
  );
}
export default App;
