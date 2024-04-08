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
import Cookie from "js-cookie";

export default function AccessDenied() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { isShown } = useSelector((state) => state.burgerMenuState);

  useEffect(() => {
    const token = Cookie.get("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn === null) {
    return <LoadingSpinner />;
  }

  return (
    <div className={style.wrapper}>
      <Helmet>
        <title>{isLoggedIn ? "404 | FlickPicks" : "401 | FlickPicks"}</title>
      </Helmet>
      <header>{isLoggedIn ? <NavbarLogged /> : <Navbar />}</header>
      <main className={isShown ? style.mainBurger : style.mainClass}>
        {isShown ? (
          <BurgerMenu />
        ) : (
          <>
            <div className={style.container}>
              {isLoggedIn ? (
                <TbError404 className={style.icon} />
              ) : (
                <TbKeyOff className={style.icon} />
              )}
              <p className={style.message}>
                {isLoggedIn
                  ? "This page does not exist. Come back to home."
                  : "You have to log in to view this page."}
              </p>
              <Button
                text={isLoggedIn ? "Home" : "Log in"}
                link={isLoggedIn ? "/home" : "/login"}
              />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
