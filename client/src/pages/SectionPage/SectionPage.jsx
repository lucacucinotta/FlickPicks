import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import Arrow from "../../components/Arrow/Arrow";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Error from "../../components/Error/Error";
import AccessDenied from "../AccessDeniedPage/AccessDenied";
import style from "./SectionPage.module.scss";
import fetchMovie from "./utils";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

export default function DiscoverPage() {
  const { section } = useParams();

  const navigate = useNavigate();

  const { isShown } = useSelector((state) => state.burgerMenuState);

  const [page, setPage] = useState(1);

  const countQuery =
    parseInt(new URLSearchParams(window.location.search).get("page")) || 1;

  useEffect(() => {
    setPage(countQuery);
  }, [section, countQuery]);

  let sectionName;

  let doQuery = true;

  let url;

  switch (section) {
    case "daily-trending":
      sectionName = "Daily Trending Movies";
      url = "trending/movie/day";
      break;
    case "weekly-trending":
      sectionName = "Weekly Trending Movies";
      url = "trending/movie/week";
      break;
    case "top-rated":
      sectionName = "Top Rated Movies";
      url = "movie/top_rated";
      break;
    default:
      doQuery = false;
      break;
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [url, page],
    queryFn: () => fetchMovie(url, page),
    refetchOnWindowFocus: false,
    enabled: doQuery,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log(error);
    return <Error refetch={refetch} error={error} />;
  }

  return data ? (
    <div className={style.wrapper}>
      <Helmet>
        <title>{sectionName} | FlickPicks</title>
      </Helmet>
      <NavbarLogged />
      <main className={isShown ? style.mainBurger : style.mainClass}>
        {isShown ? (
          <BurgerMenu />
        ) : (
          <div className={style.container}>
            <h1 className={style.title}>{sectionName}</h1>
            <div className={style.gridContainer}>
              {data.map((item, i) => (
                <Card key={i} data={item} />
              ))}
            </div>
            <div className={style.changePageContainer}>
              {page > 1 && (
                <button
                  className={style.changePageBtn}
                  onClick={() => {
                    setPage((prevState) => prevState - 1);
                    navigate(`/discover/charts/${section}/?page=${page - 1}`);
                  }}
                >
                  Previous
                </button>
              )}
              {data.total_pages !== page && (
                <button
                  className={style.changePageBtn}
                  onClick={() => {
                    setPage((prevState) => prevState + 1);
                    navigate(`/discover/charts/${section}?page=${page + 1}`);
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
        {!isShown && <Arrow />}
      </main>
      <Footer />
    </div>
  ) : (
    <AccessDenied />
  );
}
