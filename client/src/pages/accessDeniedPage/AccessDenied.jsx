import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import style from "./AccessDenied.module.scss";
import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <div className={style.wrapper}>
      <header>
        <Navbar />
      </header>
      <main>
        <div className={style.container}>
          <img src="icon.svg?url" />
          <p>You have to log in to view this page</p>
          <Link to="/login">
            <button>Log In</button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
