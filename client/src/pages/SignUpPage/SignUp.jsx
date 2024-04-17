import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import style from "./SignUp.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { MdError } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";

export default function Signin() {
  const navigate = useNavigate();

  const [showPassReq, setShowPassReq] = useState(false);
  const [showUsernameReq, setShowUsernameReq] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const [validUsername, setValidUsername] = useState(null);
  const [validEmail, setValidEmail] = useState(null);
  const [validPassword, setValidPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validUsername || !validEmail || !validPassword) {
      if (!validUsername) {
        setError((prevState) => [
          ...prevState,
          "Invalid username. Please retry.",
        ]);
      }
      if (!validEmail) {
        setError((prevState) => [
          ...prevState,
          "Invalid email address. Please retry.",
        ]);
      }
      if (!validPassword) {
        setError((prevState) => [
          ...prevState,
          "Invalid password. Please retry.",
        ]);
      }
    } else {
      try {
        await axios.post(
          "https://flickpicks-6ifw.onrender.com/signup",
          {
            username: username,
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        navigate("/login");
      } catch (err) {
        console.log(err);
        setError(
          err.response.data.errMessages || [err.response.data.errMessage]
        );
      }
    }
  };

  const errorRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleClickOutside = (e) => {
      if (errorRef.current && !errorRef.current.contains(e.target)) {
        setError([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={style.wrapper}>
      <Helmet>
        <title>Signup | FlickPicks</title>
      </Helmet>
      <header>
        <Navbar />
      </header>
      <main className={style.mainClass}>
        {error.length > 0 && (
          <div className={style.errorDiv} ref={errorRef}>
            <div className={style.alert}>
              <MdError size={15} />
              <p>There was a problem</p>
            </div>
            <div className={style.errorMessage}>
              {error.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          </div>
        )}
        <form className={style.formSignUp} id="signup" name="signup">
          <label htmlFor="username" className={style.labelClass}>
            Username
          </label>
          <div className={style.inputDiv}>
            <input
              className={
                validUsername
                  ? style.inputClass
                  : `${style.inputClass} ${style.invalid}`
              }
              type="text"
              id="username"
              name="username"
              placeholder="Insert here your username"
              autoComplete="off"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (
                  /^(?=.*[A-Za-z])[A-Za-z0-9_-]{4,20}$/.test(e.target.value)
                ) {
                  setValidUsername(true);
                } else {
                  setValidUsername(false);
                }
              }}
              onFocus={() => setShowUsernameReq(true)}
              onBlur={() => setShowUsernameReq(false)}
            ></input>
            <FaUser
              size={20}
              className={
                showUsernameReq
                  ? `${style.formIcon} ${style.fixIcon}`
                  : style.formIcon
              }
            />
            {showUsernameReq && (
              <span className={style.req}>
                The username must be 4 to 20 characters long and can only
                include letters (uppercase or lowercase), numbers, underscores,
                and hyphens.
              </span>
            )}
          </div>
          <label htmlFor="email" className={style.labelClass}>
            Email
          </label>
          <div className={style.inputDiv}>
            <input
              className={
                validEmail
                  ? style.inputClass
                  : `${style.inputClass} ${style.invalid}`
              }
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Insert here your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (
                  /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                    e.target.value
                  )
                ) {
                  setValidEmail(true);
                } else {
                  setValidEmail(false);
                }
              }}
            />
            <MdAlternateEmail size={20} className={style.formIcon} />
          </div>
          <label htmlFor="password" className={style.labelClass}>
            Password
          </label>
          <div className={style.inputDiv}>
            <input
              className={
                validPassword
                  ? style.inputClass
                  : `${style.inputClass} ${style.invalid}`
              }
              type="password"
              id="password"
              name="password"
              placeholder="Insert here your password"
              autoComplete="off"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    e.target.value
                  )
                ) {
                  setValidPassword(true);
                } else {
                  setValidPassword(false);
                }
              }}
              onFocus={() => setShowPassReq(true)}
              onBlur={() => setShowPassReq(false)}
            />
            <IoMdLock
              size={20}
              className={
                showPassReq
                  ? `${style.formIcon} ${style.fixIcon}`
                  : style.formIcon
              }
            />
            {showPassReq && (
              <span className={style.req}>
                Password must contain at least 8 characters, at least one
                capital letter, at least one number and one symbol
              </span>
            )}
          </div>
          <Button text={"Sign Up"} handleFunction={handleSubmit} />
        </form>
      </main>
      <Footer />
    </div>
  );
}
