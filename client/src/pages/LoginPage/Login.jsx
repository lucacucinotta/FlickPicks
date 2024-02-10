import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { Link } from "react-router-dom";
import style from "./Login.module.scss";

export default function Login() {
  return (
    <div className={style.wrapper}>
      <header>
        <Navbar />
      </header>
      <main>
        <form className={style.formLogin}>
          <label htmlFor="name">Email</label>
          <div className={style.inputDiv}>
            <input
              type="email"
              name="email"
              placeholder="Insert here your email"
            />
            <MdAlternateEmail size={20} className={style.formIcon} />
          </div>
          <label htmlFor="password">Password</label>
          <div className={style.inputDiv}>
            <input
              type="password"
              name="password"
              placeholder="Insert here your password"
            />
            <IoMdLock size={20} className={style.formIcon} />
          </div>
          <button>Log In</button>
        </form>
        <p className={style.registerText}>
          Do not have an account?{" "}
          <Link to="/signup" className={style.link}>
            Register Here!
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
