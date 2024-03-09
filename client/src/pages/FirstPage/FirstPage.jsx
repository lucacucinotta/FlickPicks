import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { IoSearchSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import style from "./FirstPage.module.scss";

export default function FirstPage() {
  const navigate = useNavigate();
  const scrollDown = () => {
    window.scrollTo({
      top: window.scrollY + 1.1 * window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <div className={style.wrapper}>
      <header>
        <Navbar />
      </header>
      <main>
        <div className={style.home}>
          <div className={style.container}>
            <p className={style.intro}>
              Welcome to <span className={style.title}>FlickPicks</span>
            </p>
            <p className={style.brief}>
              Your destination to discover new movies to watch and save your
              favorites.
            </p>
          </div>
          <button className={style.btnScrollDown} onClick={scrollDown}>
            <FaArrowDown size={30} />
          </button>
        </div>
        <div className={style.functionalities}>
          <div className={style.container}>
            <div className={style.featureDiv}>
              <div className={style.feature}>
                <MdLocalMovies size={70} className={style.featureIcon} />
                <p>
                  Discover new titles by exploring the different sections or
                  browse through the various genres available.
                </p>
              </div>
              <div className={style.feature}>
                <IoSearchSharp size={70} className={style.featureIcon} />
                <p>
                  Search by typing the movie&apos;s name and explore new based
                  titles about your interests.
                </p>
              </div>
              <div className={style.feature}>
                <FaStar size={70} className={style.featureIcon} />
                <p>
                  Create a personalized lists of movies that you can easily
                  access at any time.
                </p>
              </div>
            </div>
            <div className={style.signIn}>
              <p>Start exploring cinema on FlickPicks today!</p>
              {/* <Link to="/signup"> */}
              <button
                onClick={() => {
                  navigate("/signup");
                  window.scrollTo(0, 0);
                }}
              >
                Sign Up
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
