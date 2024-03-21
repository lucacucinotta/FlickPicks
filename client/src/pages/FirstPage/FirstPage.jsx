import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { IoSearchSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import style from "./FirstPage.module.scss";

export default function FirstPage() {
  useEffect(() => {
    AOS.init();
  }, []);
  const scrollDown = () => {
    window.scrollTo({
      top: window.scrollY + 1 * window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <div className={style.wrapper}>
      <Helmet>
        <title>Let&apos;s Start | FlickPicks</title>
      </Helmet>
      <header>
        <Navbar />
      </header>
      <main className={style.classMain}>
        <div className={style.home}>
          <div className={style.firstPageContainer}>
            <p className={style.intro}>
              Welcome to <span className={style.title}>FlickPicks</span>
            </p>
            <p className={style.brief}>
              Your destination to discover new movies to watch and save your
              favorites
            </p>
          </div>
          <button className={style.btnScrollDown} onClick={scrollDown}>
            <FaArrowDown size={30} />
          </button>
        </div>
        <div className={style.functionalities}>
          <div className={style.secondPageContainer}>
            <div
              className={style.featureDiv}
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              <div className={style.feature}>
                <MdLocalMovies size={70} className={style.featureIcon} />
                <p>
                  Discover new titles by exploring the different sections or
                  browse through the various genres available
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
            <div
              className={style.signIn}
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              <p>Start exploring cinema on FlickPicks today!</p>
              <Button text={"Sign Up"} link={"/signup"} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
