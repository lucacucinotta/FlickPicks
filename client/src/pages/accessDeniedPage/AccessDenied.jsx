import Navbar from "../../components/Navbar/Navbar";
import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import style from "./AccessDenied.module.scss";
import { TbKeyOff } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function AccessDenied() {
  const { isLoggedIn } = useSelector((state) => state.logState);
  return (
    <div className={style.wrapper}>
      <header>{isLoggedIn ? <NavbarLogged /> : <Navbar />}</header>
      <main>
        <div className={style.container}>
          {isLoggedIn ? (
            <FaExclamationCircle className={style.icon} />
          ) : (
            <TbKeyOff className={style.icon} />
          )}
          <p>
            {isLoggedIn
              ? "This page does not exist. Come back to home."
              : "You have to log in to view this page."}
          </p>
          <Link to={isLoggedIn ? "/" : "/login"}>
            <button>{isLoggedIn ? "Home" : "Log in"}</button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
