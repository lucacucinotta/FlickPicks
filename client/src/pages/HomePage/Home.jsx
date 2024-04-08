import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import Carousel from "../../components/Carousel/Carousel";
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
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

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
      return <Error refetch={userDataRefetch} error={userDataError} />;
    }
    if (trendingDayMovieError) {
      console.log(trendingDayMovieError);
      return (
        <Error
          refetch={trendingDayMovieRefetch}
          error={trendingDayMovieError}
        />
      );
    }
    if (trendingWeekMovieError) {
      console.log(trendingWeekMovieError);
      return (
        <Error
          refetch={trendingWeekMovieRefetch}
          error={trendingWeekMovieError}
        />
      );
    }
    if (topRatedMovieError) {
      console.log(topRatedMovieError);
      return (
        <Error refetch={topRatedMovieRefetch} error={topRatedMovieError} />
      );
    }
    if (genresError) {
      console.log(genresError);
      return <Error refetch={genresRefetch} error={genresError} />;
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
      <main className={isShown ? style.mainBurger : style.mainClass}>
        {isShown ? (
          <BurgerMenu />
        ) : (
          <>
            <div
              className={style.container}
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              <div className={style.up}>
                <Link
                  to="/discover/charts/daily-trending"
                  className={style.link}
                >
                  <h1 className={style.titleSlider}>Today&apos;s Hot Picks</h1>
                </Link>
                <IoIosArrowForward size={20} />
              </div>
              <h2 className={style.subtitleSlider}>
                Stay in the loop with the daily trending movies
              </h2>
              <Carousel data={trendingDayMovie.results} type={"movies"} />
            </div>

            <div
              className={style.container}
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              <div className={style.up}>
                <Link
                  to="/discover/charts/weekly-trending"
                  className={style.link}
                >
                  <h1 className={style.titleSlider}>Hot Weekly Flicks</h1>
                </Link>
                <IoIosArrowForward size={20} />
              </div>
              <h2 className={style.subtitleSlider}>
                Exploring the tatest movie&apos;s trends from the past week
              </h2>
              <Carousel data={trendingWeekMovie.results} type={"movies"} />
            </div>

            <div
              className={style.container}
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              <div className={style.up}>
                <Link to="/discover/charts/top-rated" className={style.link}>
                  <h1 className={style.titleSlider}>Top Rated Movies</h1>
                </Link>
                <IoIosArrowForward size={20} />
              </div>
              <h2 className={style.subtitleSlider}>
                Discover the best of the best for an unforgettable
                movie-watching experience
              </h2>
              <Carousel data={topRatedMovie.results} type={"movies"} />
            </div>

            <div
              className={style.container}
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              <div className={style.up}>
                <h1 className={style.titleSlider}>Movie&apos;s Genres</h1>
                <IoIosArrowForward size={20} />
              </div>
              <h2 className={style.subtitleSlider}>
                Find your next favourite movie browsing all the available genres
              </h2>
              <Carousel type={"genres"} />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
