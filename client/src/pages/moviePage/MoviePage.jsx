import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
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
  const [showMore, setShowMore] = useState(false);

  const [isWatched, setIsWatched] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const [reloadValue, setReloadValue] = useState(0);

  const { isShown } = useSelector((state) => state.burgerMenuState);

  const dispatch = useDispatch();

  const { movieID } = useParams();

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
          `https://flickpicks-6ifw.onrender.com/checkMovieID/${movieID}`
        );
        if (res.data.listTypes) {
          setIsWatched(res.data.listTypes.includes("watchedList"));
          setIsFavorite(res.data.listTypes.includes("favoriteList"));
          setIsAdded(res.data.listTypes.includes("watchList"));
        }
      } catch (err) {
        console.log(err);
        setIsWatched(false);
        setIsFavorite(false);
        setIsAdded(false);
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
      return <Error refetch={movieDataRefetch} />;
    }
    if (creditsError) {
      console.log(creditsError);
      return <Error refetch={creditsRefetch} />;
    }
  }

  const firstPeriodIndex = movieData.overview.indexOf(".");
  const overviewShowed =
    firstPeriodIndex !== -1
      ? movieData.overview.substring(0, firstPeriodIndex + 1)
      : movieData.overview;
  const showMoreVisible = movieData.overview.length > overviewShowed.length;

  return (
    <div className={style.wrapper}>
      <NavbarLogged />
      <main className={isShown ? style.mainBurger : null}>
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
                    src={
                      movieData.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                        : PlaceholderImg
                    }
                  />
                </div>
                <div className={style.rightSide}>
                  <h1>{movieData.title}</h1>

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
                        <span>
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
                  onClick={() => {
                    if (isWatched) {
                      updateMovieList(movieID, "remove", "watchedList");
                      if (isFavorite) {
                        updateMovieList(movieID, "remove", "favoriteList");
                      }
                      dispatch(change());
                    } else {
                      updateMovieList(movieID, "add", "watchedList");
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
                  onClick={() => {
                    if (isFavorite) {
                      updateMovieList(movieID, "remove", "favoriteList");
                      dispatch(change());
                    } else {
                      updateMovieList(movieID, "add", "favoriteList");
                      if (!isWatched) {
                        updateMovieList(movieID, "add", "watchedList");
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
                    onClick={() => {
                      if (isAdded) {
                        updateMovieList(movieID, "remove", "watchList");
                        dispatch(change());
                      } else {
                        updateMovieList(movieID, "add", "watchList");
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
              <CarouselMovie data={credits.cast} type={"cast"} />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
