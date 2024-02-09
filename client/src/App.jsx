import { Route, Routes } from "react-router-dom";
import FirstPage from "./pages/FirstPage/FirstPage.jsx";
import "./index.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
    </Routes>
  );
}
export default App;
