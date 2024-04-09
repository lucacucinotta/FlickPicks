import Navbar from "../../components/Navbar/Navbar";
import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import Button from "../../components/Button/Button";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import style from "./AccessDenied.module.scss";
import { TbKeyOff } from "react-icons/tb";
import { TbError404 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AccessDenied() {
  const { isShown } = useSelector((state) => state.burgerMenuState);

  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        axios.defaults.withCredentials = true;
        await axios.get("https://flickpicks-6ifw.onrender.com/auth");
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <LoadingSpinner />;
  }

  return (
    <div className={style.wrapper}>
      <Helmet>
        <title>{isAuth ? "404 | FlickPicks" : "401 | FlickPicks"}</title>
      </Helmet>
      <header>{isAuth ? <NavbarLogged /> : <Navbar />}</header>
      <main className={isShown ? style.mainBurger : style.mainClass}>
        {isShown ? (
          <BurgerMenu />
        ) : (
          <>
            <div className={style.container}>
              {isAuth ? (
                <TbError404 className={style.icon} />
              ) : (
                <TbKeyOff className={style.icon} />
              )}
              <p className={style.message}>
                {isAuth
                  ? "This page does not exist. Come back to home."
                  : "You have to log in to view this page."}
              </p>
              <Button
                text={isAuth ? "Home" : "Log in"}
                link={isAuth ? "/home" : "/login"}
              />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
