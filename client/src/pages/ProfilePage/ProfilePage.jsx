import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import AccessDenied from "../AccessDeniedPage/AccessDenied";
import style from "./ProfilePage.module.scss";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AccountPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { isShown } = useSelector((state) => state.burgerMenuState);

  const { userData } = useSelector((state) => state.userDataState);

  useEffect(() => {
    AOS.init();
  }, []);

  return id === userData.userID ? (
    <div className={style.wrapper}>
      <Helmet>
        <title>Profile | FlickPicks</title>
      </Helmet>
      <NavbarLogged />
      <main className={isShown ? style.mainBurger : style.mainClass}>
        {isShown ? (
          <BurgerMenu />
        ) : (
          <>
            <div
              className={style.intro}
              data-aos="fade-down"
              data-aos-duration="1200"
            >
              <h1 className={style.title}>
                Welcome,{" "}
                <span className={style.username}>{userData.username}</span>
              </h1>
              <h2 className={style.subtitle}>
                Here you can get all the movie&apos;s lists that you have been
                created.
              </h2>
            </div>

            <div
              className={style.userListsContainer}
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <span className={style.fullList}>
                Clicks to see the full list
              </span>
              <div className={style.boxContainer}>
                <div
                  className={style.box}
                  onClick={() => navigate(`/users/${id}/lists/watched-list`)}
                >
                  WatchedList
                </div>
                <div
                  className={style.box}
                  onClick={() => navigate(`/users/${id}/lists/favorite-list`)}
                >
                  FavoriteList
                </div>
                <div
                  className={style.box}
                  onClick={() => navigate(`/users/${id}/lists/watch-list`)}
                >
                  WatchList
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  ) : (
    <AccessDenied />
  );
}
