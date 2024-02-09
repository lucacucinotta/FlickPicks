import style from "./Navbar.module.scss";
import { BiSolidLogInCircle } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa6";

export default function Navbar() {
  return (
    <nav>
      <div className={style.navWrapper}>
        <span className={style.title}>FlickPicks</span>
        <div className={style.authContainer}>
          <div className={style.authDiv}>
            <BiSolidLogInCircle size={25} className={style.authIcon} />
            <span className={style.authText}>Log In</span>
          </div>
          <span>|</span>
          <div className={style.authDiv}>
            <FaUserPlus size={25} className={style.authIcon} />
            <span className={style.authText}>Sign In</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
