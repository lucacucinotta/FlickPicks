import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import style from "./AccessDenied.module.scss";
import { TbKeyOff } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import PropTypes from "prop-types";

export default function AccessDenied({ isAuthenticated }) {
  return (
    <div className={style.wrapper}>
      <header>
        <Navbar />
      </header>
      <main>
        <div className={style.container}>
          {isAuthenticated ? (
            <FaExclamationCircle className={style.icon} />
          ) : (
            <TbKeyOff className={style.icon} />
          )}
          <p>
            {isAuthenticated
              ? "This page does not exist. Come back to home."
              : "You have to log in to view this page."}
          </p>
          <Link to={isAuthenticated ? "/" : "/login"}>
            <button>{isAuthenticated ? "Home" : "Log in"}</button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

AccessDenied.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
