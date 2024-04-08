import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Carousel from "../../components/Carousel/Carousel";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import Error from "../../components/Error/Error";
import style from "./MoviePage.module.scss";
import { fetchMovie, fetchCredits, updateMovieList } from "./utils";
import axios from "axios";
import PlaceholderImg from "../../assets/images.png";
import { IoIosClose } from "react-icons/io";
import { VscPass, VscPassFilled } from "react-icons/vsc";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change } from "../../states/reloadValue";

export default function MoviePage() {
  const { movieID } = useParams();

  const [showMore, setShowMore] = useState(false);

  const [isWatched, setIsWatched] = useState(
    JSON.parse(localStorage.getItem(`${movieID}isWatched`) || "false")
  );
  const [isFavorite, setIsFavorite] = useState(
    JSON.parse(localStorage.getItem(`${movieID}isFavorite`) || "false")
  );
  const [isAdded, setIsAdded] = useState(
    JSON.parse(localStorage.getItem(`${movieID}isAdded`) || "false")
  );

  const [reloadValue, setReloadValue] = useState(0);

  const { isShown } = useSelector((state) => state.burgerMenuState);

  const dispatch = useDispatch();

  const {
    data: movieData,
    isLoading: movieIsLoading,
    error: movieError,
    refetch: movieDataRefetch,
  } = useQuery({
    queryKey: [movieID],
    queryFn: () => fetchMovie(movieID),
    refetchOnWindowFocus: false,
  });

  const {
    data: credits,
    isLoading: creditsIsLoading,
    error: creditsError,
    refetch: creditsRefetch,
  } = useQuery({
    queryKey: ["credits", movieID],
    queryFn: () => fetchCredits(movieID),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const checkMovie = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `https://flickpicks-6ifw.onrender.com/movies/${movieID}`
        );
        localStorage.setItem(
          `${movieID}isWatched`,
          JSON.stringify(res.data.listTypes.includes("watchedList"))
        );
        setIsWatched(res.data.listTypes.includes("watchedList"));
        localStorage.setItem(
          `${movieID}isFavorite`,
          JSON.stringify(res.data.listTypes.includes("favoriteList"))
        );
        setIsFavorite(res.data.listTypes.includes("favoriteList"));
        localStorage.setItem(
          `${movieID}isAdded`,
          JSON.stringify(res.data.listTypes.includes("watchList"))
        );
        setIsAdded(res.data.listTypes.includes("watchList"));
      } catch (err) {
        console.log(err);
      }
    };

    checkMovie();
  }, [movieID, reloadValue]);

  if (movieIsLoading || creditsIsLoading) {
    return <LoadingSpinner />;
  }

  if (movieError || creditsError) {
    if (movieError) {
      console.log(movieError);
      return <Error refetch={movieDataRefetch} error={movieError} />;
    }
    if (creditsError) {
      console.log(creditsError);
      return <Error refetch={creditsRefetch} error={creditsError} />;
    }
  }

  const firstPeriodIndex = movieData?.overview.indexOf(".");
  const overviewShowed =
    firstPeriodIndex !== -1
      ? movieData.overview.substring(0, firstPeriodIndex + 1)
      : movieData.overview;
  const showMoreVisible = movieData?.overview.length > overviewShowed.length;

  return (
    <div className={style.wrapper}>
      <NavbarLogged />
      <main className={isShown ? style.mainBurger : style.mainClass}>
        {isShown ? (
          <BurgerMenu />
        ) : (
          <>
            <div
              className={style.mainContainer}
              style={
                movieData.backdrop_path
                  ? {
                      backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.8) 100%),url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path})`,
                    }
                  : null
              }
            >
              <div className={style.container}>
                <div className={style.card}>
                  <img
                    className={style.locandine}
                    src={
                      movieData.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                        : PlaceholderImg
                    }
                  />
                </div>
                <div className={style.rightSide}>
                  <h1 className={style.movieTitle}>{movieData.title}</h1>

                  <div className={style.extraInfo}>
                    <span>
                      {movieData.release_date
                        ? movieData.release_date.substring(0, 4)
                        : null}
                    </span>
                    <span>•</span>
                    <span>{`${movieData.runtime} min`}</span>
                  </div>

                  <div className={style.voteContainer}>
                    {movieData.vote_average > 1 && (
                      <span>
                        {`${movieData.vote_average
                          .toString()
                          .substring(0, 3)} | ${movieData.vote_count} ${
                          movieData.vote_count > 1 ? "votes" : "vote"
                        }`}
                      </span>
                    )}
                  </div>

                  <div className={style.overviewUp}>
                    <p className={style.overviewText}>{movieData.overview}</p>
                    <div className={style.lastInfo}>
                      <p>
                        Directed by :{" "}
                        <span className={style.director}>
                          {" "}
                          {
                            credits.crew.find(
                              (member) => member.job === "Director"
                            ).name
                          }
                        </span>
                      </p>
                      <p>
                        Genres :{" "}
                        {movieData.genres.map((item, i) => (
                          <span key={i}>
                            {item.name}
                            {i !== movieData.genres.length - 1 && ", "}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={style.overviewContainer}>
                <p>
                  {showMore ? movieData.overview : overviewShowed}
                  {showMoreVisible && !showMore ? (
                    <span
                      onClick={() => setShowMore(true)}
                      className={style.showMoreSpan}
                    >
                      {" "}
                      ...more
                    </span>
                  ) : (
                    showMoreVisible && (
                      <IoIosClose
                        onClick={() => setShowMore(false)}
                      ></IoIosClose>
                    )
                  )}
                </p>
                <div className={style.lastInfo}>
                  <p>
                    Directed by :{" "}
                    <span>
                      {" "}
                      {
                        credits.crew.find((member) => member.job === "Director")
                          .name
                      }
                    </span>
                  </p>
                  <p>
                    Genres :{" "}
                    {movieData.genres.map((item, i) => (
                      <span key={i}>
                        {item.name}
                        {i !== movieData.genres.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className={style.actionContainer}>
                <div
                  className={
                    isWatched ? `${style.box} ${style.boxClick}` : style.box
                  }
                  onClick={async () => {
                    if (isWatched) {
                      await updateMovieList(movieID, "remove", "watchedList");
                      if (isFavorite) {
                        await updateMovieList(
                          movieID,
                          "remove",
                          "favoriteList"
                        );
                      }
                      dispatch(change());
                    } else {
                      await updateMovieList(movieID, "add", "watchedList");
                      dispatch(change());
                    }
                    setReloadValue((prevState) => prevState + 1);
                  }}
                >
                  {!isWatched ? <VscPass /> : <VscPassFilled />}
                  <span>
                    {isWatched ? "Added to WatchedList" : "Add to WatchedList"}
                  </span>
                </div>
                <div
                  className={
                    isFavorite ? `${style.box} ${style.boxClick}` : style.box
                  }
                  onClick={async () => {
                    if (isFavorite) {
                      await updateMovieList(movieID, "remove", "favoriteList");
                      dispatch(change());
                    } else {
                      await updateMovieList(movieID, "add", "favoriteList");
                      if (!isWatched) {
                        await updateMovieList(movieID, "add", "watchedList");
                      }
                      dispatch(change());
                    }
                    setReloadValue((prevState) => prevState + 1);
                  }}
                >
                  {!isFavorite ? <FaRegStar /> : <FaStar />}
                  {isFavorite ? "Added to FavoriteList" : "Add to FavoriteList"}
                </div>
                {!isFavorite && !isWatched && (
                  <div
                    className={
                      isAdded ? `${style.box} ${style.boxClick}` : style.box
                    }
                    onClick={async () => {
                      if (isAdded) {
                        await updateMovieList(movieID, "remove", "watchList");
                        dispatch(change());
                      } else {
                        await updateMovieList(movieID, "add", "watchList");
                        dispatch(change());
                      }
                      setReloadValue((prevState) => prevState + 1);
                    }}
                  >
                    {!isAdded ? (
                      <MdOutlineBookmarkBorder />
                    ) : (
                      <MdOutlineBookmark />
                    )}
                    {isAdded ? "Added to WatchList" : "Add to WatchList"}
                  </div>
                )}
              </div>
            </div>
            <div className={style.carouselContainer}>
              <p className={style.cast}>Cast</p>
              <Carousel data={credits.cast} type={"cast"} />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
