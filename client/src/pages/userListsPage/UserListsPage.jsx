import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import Arrow from "../../components/Arrow/Arrow";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Error from "../../components/Error/Error";
import Button from "../../components/Button/Button";
import style from "./UserListsPage.module.scss";
import { fetchUserLists, getMovieData } from "./utils";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Helmet } from "react-helmet";

export default function UserListsPage() {
  const { isShown } = useSelector((state) => state.burgerMenuState);

  const { reloadValue } = useSelector((state) => state.reloadValueState);

  const { list } = useParams();

  let listName;

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
  }

  const {
    data: userLists,
    isLoading: userListsLoading,
    error: userListsError,
    refetch: userListsRefetch,
  } = useQuery({
    queryKey: [reloadValue],
    queryFn: () => fetchUserLists(),
    refetchOnWindowFocus: false,
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
      <Helmet>
        <title>{listName} | FlickPicks</title>
      </Helmet>
      <NavbarLogged />
      <main className={isShown ? style.mainBurger : null}>
        {isShown ? (
          <BurgerMenu />
        ) : (
          <>
            {movieData ? (
              <div className={style.container}>
                <h1>{listName}</h1>
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
                  <h1>This list is empty!</h1>
                  <p>
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
    </div>
  );
}
