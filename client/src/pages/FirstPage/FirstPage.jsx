import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { IoSearchSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { GiTicket } from "react-icons/gi";
import { FaArrowDown } from "react-icons/fa";

import style from "./FirstPage.module.scss";

export default function FirstPage() {
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
              Welcome to <p className={style.title}>FlickPicks</p>
            </p>
            <p className={style.brief}>
              Your destination to discover new film to watch and save your
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
                <IoSearchSharp size={30} className={style.featureIcon} />
                <p>
                  Search from a wide selection of movies and explore new based
                  titles about your interests
                </p>
              </div>
              <div className={style.feature}>
                <FaStar size={30} className={style.featureIcon} />
                <p>
                  Create a personalized list of favorite movies that you can
                  easily access at any time.
                </p>
              </div>
              <div className={style.feature}>
                <GiTicket size={30} className={style.featureIcon} />
                <p>
                  Get ready for your daily dose of cinematic pleasure thanks to
                  the &quot;Daily Pick&quot; section
                </p>
              </div>
            </div>
            <div className={style.signIn}>
              <p>Start exploring cinema on FlickPicks today!</p>
              <button>Sign In</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
