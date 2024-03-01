import style from "./MoviePage.module.scss";
import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import {
  fetchMovie,
  fetchCast,
  addFilmWatched,
  addFilmFavorite,
  addFilmWatchlist,
} from "./utils";
import PlaceholderImg from "../../assets/images.png";
import { IoIosClose } from "react-icons/io";
import { VscPass, VscPassFilled } from "react-icons/vsc";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { PulseLoader } from "react-spinners";
import { useState } from "react";
import CarouselCast from "../../components/CarouselCast/CarosuelCast";

export default function MoviePage() {
  //state per mostrare più testo
  const [showMore, setShowMore] = useState(false);

  //state per l'inserimento di un film all'interno di una lista
  const [isWatched, setIsWatched] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const navigate = useNavigate();

  //id del film cliccato
  const { movieID } = useParams();

  //chiamata API per ricevere i dettagli del film cliccato
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [movieID],
    queryFn: () => fetchMovie(movieID),
    refetchOnWindowFocus: false,
  });

  //chiamata API per ricevere i dettagli del cast del film
  const {
    data: castData,
    isLoading: castIsLoading,
    isError: castIsError,
    error: castError,
  } = useQuery({
    queryKey: ["cast", movieID],
    queryFn: () => fetchCast(movieID),
    refetchOnWindowFocus: false,
  });

  if (isLoading || castIsLoading) {
    return (
      <div className={style.loadingDiv}>
        <PulseLoader size={50} color="#0074e4" />
      </div>
    );
  }

  if (isError || castIsError) {
    navigate("*");
    if (isError) console.log(error);
    if (castIsError) console.log(castError);
  }

  console.log(castData);

  //qua andiamo a cercare la posizione in cui si trova il primo "." all'interno dell'overview
  const firstPeriodIndex = data.overview.indexOf(".");
  //qua diciamo che se ha trovato un punto, di darci la substring che inizia da 0 e che va fino al punto +1 (comprende il punto)
  //sennò di dare la stringa originale
  const overviewShowed =
    firstPeriodIndex !== -1
      ? data.overview.substring(0, firstPeriodIndex + 1)
      : data.overview;
  //questo ci serve per controllare se la stringa ottenuta in precedenza non sia uguale a quella originale,
  //nel caso non mostriamo lo "show more"
  const showMoreVisible = data.overview.length > overviewShowed.length;

  return (
    <div className={style.wrapper}>
      <NavbarLogged />
      <main>
        <div
          className={style.mainContainer}
          style={
            data.backdrop_path
              ? {
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.8) 100%),url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
                }
              : null
          }
        >
          {/* qui inizia il container del primo blocco, che contiene copertina e testo.*/}
          <div className={style.container}>
            <div className={style.card}>
              <img
                src={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
                    : PlaceholderImg
                }
              />
            </div>
            <div className={style.textContainer}>
              <h1>{data.title}</h1>
              <div className={style.extraInfo}>
                <span>
                  {data.release_date ? data.release_date.substring(0, 4) : null}
                </span>
                <span>•</span>
                <span>
                  {data.vote_average >= 1
                    ? `${data.vote_average.toString().substring(0, 3)} | ${
                        data.vote_count
                      } ${data.vote_count > 1 ? "votes" : "vote"}`
                    : null}
                </span>
              </div>
              <div className={style.genresContainer}>
                {data.genres.map((item, i) => (
                  <span key={i}>
                    {item.name.toUpperCase()}
                    {i !== data.genres.length - 1 && ","}
                  </span>
                ))}
              </div>
              {/* questo fino a 500px non sarà visibile*/}
              <div className={style.overviewUp}>
                <p>{data.overview}</p>
              </div>
              {/* questo fino a 500px non sarà visibile*/}
            </div>
          </div>
          {/* FINE DEL PRIMO CONTAINER*/}

          {/* INIZIO DEL CONTAINER OVERVIEW*/}
          <div className={style.overviewContainer}>
            <p>
              {showMore ? data.overview : overviewShowed}
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
          </div>
          {/* FINE DEL CONTAINER OVERVIEW*/}

          {/* INIZIO DEL CONTAINER ACTION*/}
          <div className={style.actionContainer}>
            <div
              className={
                isWatched ? `${style.box} ${style.boxClick}` : style.box
              }
              onClick={() => setIsWatched((prevState) => !prevState)}
            >
              {!isWatched ? <VscPass size={20} /> : <VscPassFilled size={20} />}
              <span>Add to WatchedList</span>
            </div>
            <div
              className={
                isFavorite ? `${style.box} ${style.boxClick}` : style.box
              }
              onClick={() => setIsFavorite((prevState) => !prevState)}
            >
              {!isFavorite ? <FaRegStar /> : <FaStar />}
              <span>Add to FavoriteList</span>
            </div>
            <div
              className={isAdded ? `${style.box} ${style.boxClick}` : style.box}
              onClick={() => setIsAdded((prevState) => !prevState)}
            >
              {!isAdded ? <MdOutlineBookmarkBorder /> : <MdOutlineBookmark />}
              <span>Add to WatchList</span>
            </div>
          </div>
          {/* INIZIO DEL CONTAINER ACTION*/}
        </div>
        {castData.length > 1 && (
          <>
            <p className={style.cast}>Cast</p>
            <CarouselCast data={castData} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
