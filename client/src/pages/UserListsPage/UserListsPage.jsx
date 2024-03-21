import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import Arrow from "../../components/Arrow/Arrow";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Error from "../../components/Error/Error";
import Button from "../../components/Button/Button";
import AccessDenied from "../AccessDeniedPage/AccessDenied";
import style from "./UserListsPage.module.scss";
import { fetchUserLists, getMovieData } from "./utils";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Helmet } from "react-helmet";

export default function UserListsPage() {
  const [isUserExists, setIsUserExists] = useState(true);

  const { isShown } = useSelector((state) => state.burgerMenuState);

  const { reloadValue } = useSelector((state) => state.reloadValueState);

  const { id, list } = useParams();

  const { userData } = useSelector((state) => state.userDataState);

  useEffect(() => {
    if (id !== userData.userID) {
      setIsUserExists(false);
    }
  }, [id, userData.userID]);

  let listName;

  let doQuery = true;

  let field;

  switch (list) {
    case "watched-list":
      listName = "WatchedList";
      field = "watchedList";
      break;
    case "favorite-list":
      listName = "FavoriteList";
      field = "favoriteList";
      break;
    case "watch-list":
      listName = "WatchList";
      field = "watchList";
      break;
    default:
      doQuery = false;
  }

  const {
    data: userLists,
    isLoading: userListsLoading,
    error: userListsError,
    refetch: userListsRefetch,
  } = useQuery({
    queryKey: [reloadValue, isUserExists],
    queryFn: () => fetchUserLists(),
    refetchOnWindowFocus: false,
    enabled: doQuery && isUserExists,
  });

  const {
    data: movieData,
    isLoading: movieDataLoading,
    error: movieDataError,
    refetch: movieDataRefetch,
  } = useQuery({
    queryKey: [field, reloadValue],
    queryFn: () => getMovieData(userLists, field),
    enabled: !!userLists && !!userLists[field] && userLists[field].length > 0,
    refetchOnWindowFocus: false,
  });

  if (userListsLoading || movieDataLoading) {
    return <LoadingSpinner />;
  }

  if (userListsError || movieDataError) {
    if (userListsError) {
      console.log(userListsError);
      return <Error refetch={userListsRefetch} />;
    }
    if (movieDataError) {
      console.log(movieDataError);
      return <Error refetch={movieDataRefetch} />;
    }
  }

  return (
    <div className={style.wrapper}>
      {userLists ? (
        <>
          <Helmet>
            <title>{listName} | FlickPicks</title>
          </Helmet>
          <NavbarLogged />
          <main className={isShown ? style.mainBurger : style.mainClass}>
            {isShown ? (
              <BurgerMenu />
            ) : (
              <>
                {movieData ? (
                  <div className={style.container}>
                    <h1 className={style.title}>{listName}</h1>
                    <div className={style.gridContainer}>
                      {movieData.reverse().map((item, i) => (
                        <Card key={i} data={item} showMoreInfo={false} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={style.emptyList}>
                    <AiOutlineMinusCircle className={style.icon} />
                    <div className={style.text}>
                      <h1 className={style.emptyListTitle}>
                        This list is empty!
                      </h1>
                      <p className={style.redirect}>
                        Come back to home and discover new movie to add in this
                        list.
                      </p>
                    </div>
                    <Button text={"Home"} link={"/"} />
                  </div>
                )}
              </>
            )}
            {!isShown && movieData && movieData.length > 5 && <Arrow />}
          </main>
          <Footer />
        </>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
}
