import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import style from "./SignUp.module.scss";
import { FaUser } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { useState } from "react";

export default function Signin() {
  const [showPassReq, setShowPassReq] = useState(false);
  return (
    <div className={style.wrapper}>
      <header>
        <Navbar />
      </header>
      <main>
        <form className={style.formSignUp}>
          <label htmlFor="username">Username</label>
          <div className={style.inputDiv}>
            <input
              type="text"
              name="username"
              placeholder="Insert here your username"
            ></input>
            <FaUser size={20} className={style.formIcon} />
          </div>
          <label htmlFor="email">Email</label>
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
              onFocus={() => setShowPassReq(true)}
              onBlur={() => setShowPassReq(false)}
            />
            <IoMdLock
              size={20}
              className={
                showPassReq
                  ? `${style.formIcon} ${style.passwordIcon}`
                  : style.formIcon
              }
            />
            {showPassReq && (
              <span className={style.passReq}>
                Password must contain at least 8 characters, at least one
                capital letter, at least one number and one symbol
              </span>
            )}
          </div>
          <button>Sign Up</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
