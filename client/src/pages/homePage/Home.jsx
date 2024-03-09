import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import style from "./Home.module.scss";
import fetchMovie from "./utils";
import { useQuery } from "react-query";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addGenres } from "../../states/genres";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isShown } = useSelector((state) => state.burgerMenuState);

  const {
    data: trendingDayMovie,
    isLoading: trendingDayMovieLoading,
    error: trendingDayMovieError,
  } = useQuery({
    queryKey: ["trendingDayMovie"],
    queryFn: () =>
      fetchMovie("https://api.themoviedb.org/3/trending/movie/day"),
    staleTime: 86400,
  });

  const {
    data: trendingWeekMovie,
    isLoading: trendingWeekMovieLoading,
    error: trendingWeekMovieError,
  } = useQuery({
    queryKey: ["trendingWeekMovie"],
    queryFn: () =>
      fetchMovie("https://api.themoviedb.org/3/trending/movie/week"),
    staleTime: 86400,
  });

  const {
    data: topRatedMovie,
    isLoading: topRatedMovieLoading,
    error: topRatedMovieError,
  } = useQuery({
    queryKey: ["topRatedmovie"],
    queryFn: () => fetchMovie("https://api.themoviedb.org/3/movie/top_rated"),
    staleTime: 86400,
  });

  const { isLoading: genresLoading, error: genresError } = useQuery({
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
    return <LoadingSpinner />;
  }

  if (
    trendingDayMovieError ||
    trendingWeekMovieError ||
    topRatedMovieError ||
    genresError
  ) {
    navigate("*");
    if (trendingDayMovieError) console.log(trendingDayMovieError);
    if (trendingWeekMovieError) console.log(trendingWeekMovieError);
    if (topRatedMovieError) console.log(topRatedMovieError);
    if (genresError) console.log(genresError);
  }

  return (
    <div className={style.wrapper}>
      <header>
        <NavbarLogged />
      </header>
      <main className={isShown ? style.mainBurger : null}>
        {isShown ? (
          <BurgerMenu />
        ) : (
          <>
            <div className={style.container}>
              <div className={style.up}>
                <Link
                  to="/discover/movies/daily-trending"
                  className={style.link}
                >
                  <h1 className={style.titleSlider}>Today&apos;s Hot Picks</h1>
                </Link>
                <IoIosArrowForward size={20} />
              </div>
              <h2 className={style.subtitleSlider}>
                Stay in the loop with the daily trending movies
              </h2>
              <CarouselMovie data={trendingDayMovie.results} type={"movies"} />
            </div>

            <div className={style.container}>
              <div className={style.up}>
                <Link
                  to="/discover/movies/weekly-trending"
                  className={style.link}
                >
                  <h1 className={style.titleSlider}>Hot Weekly Flicks</h1>
                </Link>
                <IoIosArrowForward size={20} />
              </div>
              <h2 className={style.subtitleSlider}>
                Exploring the tatest movie&apos;s trends from the past week
              </h2>
              <CarouselMovie data={trendingWeekMovie.results} type={"movies"} />
            </div>

            <div className={style.container}>
              <div className={style.up}>
                <Link to="/discover/movies/top-rated" className={style.link}>
                  <h1 className={style.titleSlider}>Top Rated Movies</h1>
                </Link>
                <IoIosArrowForward size={20} />
              </div>
              <h2 className={style.subtitleSlider}>
                Discover the best of the best for an unforgettable
                movie-watching experience
              </h2>
              <CarouselMovie data={topRatedMovie.results} type={"movies"} />
            </div>

            <div className={style.container}>
              <div className={style.up}>
                <h1 className={style.titleSlider}>Movie&apos;s Genres</h1>
                <IoIosArrowForward size={20} />
              </div>
              <h2 className={style.subtitleSlider}>
                Find your next favourite movie browsing all the available genres
              </h2>
              <CarouselMovie type={"genres"} />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
