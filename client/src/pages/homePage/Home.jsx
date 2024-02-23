/* eslint-disable no-unused-vars */
import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import style from "./Home.module.scss";
import { useQuery } from "react-query";
import fetchMovie from "./utils";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import CarouselGenres from "../../components/CarouselGenres/CarouselGenres";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addGenres } from "../../states/genres";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isShown } = useSelector((state) => state.burgerMenuState);

  const {
    data: trendingDayMovie,
    isLoading: trendingDayMovieLoading,
    isError: trendingDayMovieError,
  } = useQuery({
    queryKey: ["trendingDayMovie"],
    queryFn: () =>
      fetchMovie("https://api.themoviedb.org/3/trending/movie/day"),
    staleTime: 86400,
  });

  const {
    data: trendingWeekMovie,
    isLoading: trendingWeekMovieLoading,
    isError: trendingWeekMovieError,
  } = useQuery({
    queryKey: ["trendingWeekMovie"],
    queryFn: () =>
      fetchMovie("https://api.themoviedb.org/3/trending/movie/week"),
    staleTime: 86400,
  });

  const {
    data: topRatedMovie,
    isLoading: topRatedMovieLoading,
    isError: topRatedMovieError,
  } = useQuery({
    queryKey: ["topRatedmovie"],
    queryFn: () => fetchMovie("https://api.themoviedb.org/3/movie/top_rated"),
    staleTime: 86400,
  });

  const {
    data: genres,
    isLoading: genresLoading,
    isError: genresError,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: () => fetchMovie("https://api.themoviedb.org/3/genre/movie/list"),
    staleTime: 86400,
    onSuccess: (genres) => {
      dispatch(addGenres(genres.genres));
    },
  });

  if (
    topRatedMovieLoading ||
    trendingDayMovieLoading ||
    trendingWeekMovieLoading ||
    genresLoading
  ) {
    return (
      <div className={style.loadingDiv}>
        <PulseLoader size={50} color="#0074e4" />
      </div>
    );
  }

  if (
    trendingDayMovieError ||
    trendingWeekMovieError ||
    topRatedMovieError ||
    genresError
  ) {
    navigate("*");
    console.log("Something gone wrong");
  }

  return (
    <div className={style.wrapper}>
      <header>
        <NavbarLogged />
      </header>
      <main className={isShown ? style.mainSingleColor : null}>
        {isShown ? (
          <BurgerMenu />
        ) : (
          <>
            <div className={style.container}>
              <div className={style.up}>
                <h1 className={style.titleSlider}>Today&apos;s Hot Picks</h1>
                <IoIosArrowForward size={20} />
              </div>
              <h2 className={style.subtitleSlider}>
                Stay in the loop with the daily trending movies!
              </h2>
              <CarouselMovie data={trendingDayMovie.results} />
            </div>

            <div className={style.container}>
              <div className={style.up}>
                <h1 className={style.titleSlider}>Hot Weekly Flicks</h1>
                <IoIosArrowForward size={20} />
              </div>
              <h2 className={style.subtitleSlider}>
                Exploring the Latest Movie Trends from the Past Week
              </h2>
              <CarouselMovie data={trendingWeekMovie.results} />
            </div>

            <div className={style.container}>
              <div className={style.up}>
                <h1 className={style.titleSlider}>Top Rated Movie</h1>
                <IoIosArrowForward size={20} />
              </div>
              <h2 className={style.subtitleSlider}>
                Top rated movies by IMDB community
              </h2>
              <CarouselMovie data={topRatedMovie.results} />
            </div>

            <div className={style.container}>
              <div className={style.up}>
                <h1 className={style.titleSlider}>Movie&apos;s Genres</h1>
                <IoIosArrowForward size={20} />
              </div>
              <h2 className={style.subtitleSlider}>All genres.</h2>
              <CarouselGenres />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
