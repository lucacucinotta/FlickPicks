import style from "./MoviePage.module.scss";
import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import {
  fetchMovie,
  fetchCredits,
  addMovieWatched,
  removeMovieWatched,
  addMovieFavorite,
  removeMovieFavorite,
  addMovieWatchlist,
  removeMovieWatchList,
} from "./utils";
import PlaceholderImg from "../../assets/images.png";
import { IoIosClose } from "react-icons/io";
import { VscPass, VscPassFilled } from "react-icons/vsc";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { PulseLoader } from "react-spinners";
import { useState, useEffect } from "react";
import CarouselCast from "../../components/CarouselCast/CarosuelCast";
import axios from "axios";

export default function MoviePage() {
  //state per mostrare più testo
  const [showMore, setShowMore] = useState(false);

  // state per l'inserimento di un movie all'interno di una lista
  const [isWatched, setIsWatched] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  //State aggiuntivo per permettere di rielaborare lo useEffect
  const [reloadValue, setReloadValue] = useState(0);

  const navigate = useNavigate();

  //id del movie cliccato
  const { movieID } = useParams();

  //chiamata API per ricevere i dettagli del movie cliccato
  const {
    data: movieData,
    isLoading: movieIsLoading,
    isError: movieIsError,
    error: movieError,
  } = useQuery({
    queryKey: [movieID],
    queryFn: () => fetchMovie(movieID),
    refetchOnWindowFocus: false,
  });

  //chiamata API per ricevere i dettagli del cast del movie
  const {
    data: credits,
    isLoading: creditsIsLoading,
    isError: creditsIsError,
    error: creditsError,
  } = useQuery({
    queryKey: ["credits", movieID],
    queryFn: () => fetchCredits(movieID),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const checkMovie = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8081/checkMovieID/${movieID}`
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
    return (
      <div className={style.loadingDiv}>
        <PulseLoader size={50} color="#0074e4" />
      </div>
    );
  }

  if (movieIsError || creditsIsError) {
    navigate("*");
    if (movieIsError) console.log(movieError);
    if (creditsIsError) console.log(creditsError);
  }

  //qua andiamo a cercare la posizione in cui si trova il primo "." all'interno dell'overview
  const firstPeriodIndex = movieData.overview.indexOf(".");
  //qua diciamo che se ha trovato un punto, di darci la substring che inizia da 0 e che va fino al punto +1 (comprende il punto)
  //sennò di dare la stringa originale
  const overviewShowed =
    firstPeriodIndex !== -1
      ? movieData.overview.substring(0, firstPeriodIndex + 1)
      : movieData.overview;
  //questo ci serve per controllare se la stringa ottenuta in precedenza non sia uguale a quella originale,
  //nel caso non mostriamo lo "show more"
  const showMoreVisible = movieData.overview.length > overviewShowed.length;

  return (
    <div className={style.wrapper}>
      <NavbarLogged />
      <main>
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
          {/* qui inizia il container del primo blocco, che contiene copertina e testo.*/}
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
                    {`${movieData.vote_average.toString().substring(0, 3)} | ${
                      movieData.vote_count
                    } ${movieData.vote_count > 1 ? "votes" : "vote"}`}
                  </span>
                )}
              </div>

              {/* questo fino a 500px non sarà visibile*/}
              <div className={style.overviewUp}>
                <p className={style.overviewText}>{movieData.overview}</p>
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

              {/* questo fino a 500px non sarà visibile*/}
            </div>
          </div>
          {/* FINE DEL PRIMO CONTAINER*/}

          {/* INIZIO DEL CONTAINER OVERVIEW*/}
          <div className={style.overviewContainer}>
            <p>
              {showMore ? movieData.overview : overviewShowed}
              {showMoreVisible && !showMore ? (
                <span
                  onClick={() => setShowMore(true)}
                  style={{ fontWeight: "700", cursor: "pointer" }}
                >
                  {" "}
                  ...more
                </span>
              ) : (
                showMoreVisible && (
                  <IoIosClose
                    style={{ color: "white", width: "20px" }}
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
          {/* FINE DEL CONTAINER OVERVIEW*/}

          {/* INIZIO DEL CONTAINER ACTION*/}
          <div className={style.actionContainer}>
            <div
              className={
                isWatched ? `${style.box} ${style.boxClick}` : style.box
              }
              onClick={() => {
                if (isWatched) {
                  removeMovieWatched(movieID);
                } else {
                  addMovieWatched(movieID);
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
                  removeMovieFavorite(movieID);
                } else {
                  addMovieFavorite(movieID);
                }
                setReloadValue((prevState) => prevState + 1);
              }}
            >
              {!isFavorite ? <FaRegStar /> : <FaStar />}
              {isFavorite ? "Added to FavoriteList" : "Add to FavoriteList"}
            </div>
            {!isWatched && (
              <div
                className={
                  isAdded ? `${style.box} ${style.boxClick}` : style.box
                }
                onClick={() => {
                  if (isAdded) {
                    removeMovieWatchList(movieID);
                  } else {
                    addMovieWatchlist(movieID);
                  }
                  setReloadValue((prevState) => prevState + 1);
                }}
              >
                {!isAdded ? <MdOutlineBookmarkBorder /> : <MdOutlineBookmark />}
                {isAdded ? "Added to WatchList" : "Add to WatchList"}
              </div>
            )}
          </div>
          {/* INIZIO DEL CONTAINER ACTION*/}
        </div>
        {credits.cast.length > 1 && (
          <>
            <p className={style.cast}>Cast</p>
            <CarouselCast data={credits.cast} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
