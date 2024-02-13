import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import style from "./Login.module.scss";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8081/login",
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
      alert("login successful");
    } catch (err) {
      console.log(err);
      setError(err.response.data.errMessage);
    }
  };
  return (
    <div className={style.wrapper}>
      <header>
        <Navbar />
      </header>
      <main>
        {error && (
          <div className={style.errorDiv}>
            <div className={style.alert}>
              <MdError size={15} />
              <p>There was a problem</p>
            </div>
            <div className={style.errorMessage}>
              <p>{error}</p>
            </div>
          </div>
        )}
        <form className={style.formLogin}>
          <label htmlFor="username">Username</label>
          <div className={style.inputDiv}>
            <input
              type="text"
              name="username"
              placeholder="Insert here your username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MdAlternateEmail size={20} className={style.formIcon} />
          </div>
          <label htmlFor="password">Password</label>
          <div className={style.inputDiv}>
            <input
              type="password"
              name="password"
              placeholder="Insert here your password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IoMdLock size={20} className={style.formIcon} />
          </div>
          <button onClick={handleSubmit}>Log In</button>
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
