import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import Error from "../../components/Error/Error";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import style from "./Home.module.scss";
import { getUserData, fetchMovie } from "./utils";
import { useQuery } from "react-query";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addGenres } from "../../states/genres";
import { change } from "../../states/userData";
import { Helmet } from "react-helmet";

export default function Home() {
  const dispatch = useDispatch();

  const { isShown } = useSelector((state) => state.burgerMenuState);

  const {
    isLoading: userDataLoading,
    error: userDataError,
    refetch: userDataRefetch,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    refetchOnWindowFocus: false,
    onSuccess: (data) => dispatch(change(data)),
  });

  const {
    data: trendingDayMovie,
    isLoading: trendingDayMovieLoading,
    error: trendingDayMovieError,
    refetch: trendingDayMovieRefetch,
  } = useQuery({
    queryKey: ["trendingDayMovie"],
    queryFn: () =>
      fetchMovie("https://api.themoviedb.org/3/trending/movie/day"),
    refetchOnWindowFocus: false,
    staleTime: 86400,
  });

  const {
    data: trendingWeekMovie,
    isLoading: trendingWeekMovieLoading,
    error: trendingWeekMovieError,
    refetch: trendingWeekMovieRefetch,
  } = useQuery({
    queryKey: ["trendingWeekMovie"],
    queryFn: () =>
      fetchMovie("https://api.themoviedb.org/3/trending/movie/week"),
    refetchOnWindowFocus: false,
    staleTime: 86400,
  });

  const {
    data: topRatedMovie,
    isLoading: topRatedMovieLoading,
    error: topRatedMovieError,
    refetch: topRatedMovieRefetch,
  } = useQuery({
    queryKey: ["topRatedmovie"],
    queryFn: () => fetchMovie("https://api.themoviedb.org/3/movie/top_rated"),
    refetchOnWindowFocus: false,
    staleTime: 86400,
  });

  const {
    isLoading: genresLoading,
    error: genresError,
    refetch: genresRefetch,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: () => fetchMovie("https://api.themoviedb.org/3/genre/movie/list"),
    refetchOnWindowFocus: false,
    staleTime: 86400,
    onSuccess: (genres) => {
      dispatch(addGenres(genres.genres));
    },
  });

  if (
    userDataLoading ||
    topRatedMovieLoading ||
    trendingDayMovieLoading ||
    trendingWeekMovieLoading ||
    genresLoading
  ) {
    return <LoadingSpinner />;
  }

  if (
    userDataError ||
    trendingDayMovieError ||
    trendingWeekMovieError ||
    topRatedMovieError ||
    genresError
  ) {
    if (userDataError) {
      console.log(userDataError);
      return <Error refetch={userDataRefetch} />;
    }
    if (trendingDayMovieError) {
      console.log(trendingDayMovieError);
      return <Error refetch={trendingDayMovieRefetch} />;
    }
    if (trendingWeekMovieError) {
      console.log(trendingWeekMovieError);
      return <Error refetch={trendingWeekMovieRefetch} />;
    }
    if (topRatedMovieError) {
      console.log(topRatedMovieError);
      return <Error refetch={topRatedMovieRefetch} />;
    }
    if (genresError) {
      console.log(genresError);
      return <Error refetch={genresRefetch} />;
    }
  }
  return (
    <div className={style.wrapper}>
      <Helmet>
        <title>Homepage | FlickPicks</title>
      </Helmet>
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
