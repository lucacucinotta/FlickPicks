import style from "./Navbar.module.scss";
import { BiSolidLogInCircle } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className={style.navWrapper}>
        <Link to="/" className={style.link}>
          <span className={style.title}>FlickPicks</span>
        </Link>
        <div className={style.authContainer}>
          <Link to="/login" className={style.link}>
            <div className={style.authDiv}>
              <BiSolidLogInCircle size={25} />
              <span className={style.authText}>Log In</span>
            </div>
          </Link>
          <span>|</span>
          <Link to="/signup" className={style.link}>
            <div className={style.authDiv}>
              <FaUserPlus size={25} />
              <span className={style.authText}>Sign Up</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
