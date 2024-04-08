import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { MdError } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://flickpicks-6ifw.onrender.com/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      navigate("/home");
    } catch (err) {
      console.log(err);
      setError(err.response.data.errMessage);
    }
  };

  const errorRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (errorRef.current && !errorRef.current.contains(e.target)) {
        setError(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={style.wrapper}>
      <Helmet>
        <title>Login | FlickPicks</title>
      </Helmet>
      <header>
        <Navbar />
      </header>
      <main className={style.mainClass}>
        {error && (
          <div className={style.errorDiv} ref={errorRef}>
            <div className={style.alert}>
              <MdError size={15} />
              <p>There was a problem</p>
            </div>
            <div className={style.errorMessage}>
              <p>{error}</p>
            </div>
          </div>
        )}
        <form className={style.formLogin} id="login" name="login">
          <label htmlFor="username" className={style.labelClass}>
            Username
          </label>
          <div className={style.inputDiv}>
            <input
              className={style.inputClass}
              type="text"
              id="username"
              name="username"
              placeholder="Insert here your username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MdAlternateEmail size={20} className={style.formIcon} />
          </div>
          <label htmlFor="password" className={style.labelClass}>
            Password
          </label>
          <div className={style.inputDiv}>
            <input
              className={style.inputClass}
              type="password"
              id="password"
              name="password"
              placeholder="Insert here your password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IoMdLock size={20} className={style.formIcon} />
          </div>
          <Button text={"Log In"} handleFunction={handleSubmit} />
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
