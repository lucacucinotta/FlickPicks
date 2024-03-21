import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import Card from "../../components/Card/Card";
import SortMenu from "../../components/SortMenu/SortMenu";
import Arrow from "../../components/Arrow/Arrow";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Error from "../../components/Error/Error";
import AccessDenied from "../AccessDeniedPage/AccessDenied";
import style from "./GenresPage.module.scss";
import fetchMovie from "./utils";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function GenresPage() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const todayDate = `${year}-${month}-${day}`;

  const navigate = useNavigate();

  const { genresList } = useSelector((state) => state.genresState);

  const { isShown } = useSelector((state) => state.burgerMenuState);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("sort_by") || "most-popular";
  const countQuery = parseInt(searchParams.get("page")) || 1;

  const { genresName } = useParams();

  useEffect(() => {
    setPage(countQuery);
  }, [genresName, countQuery]);

  const [page, setPage] = useState(1);

  let newGenresName;

  switch (genresName) {
    case "tv-movie":
      newGenresName = "TV Movie";
      break;
    case "science-fiction":
      newGenresName = "Science Fiction";
      break;
    default:
      newGenresName = genresName[0].toUpperCase() + genresName.substring(1);
  }

  const genresMatched = genresList.find(
    (genre) => genre.name === newGenresName
  );

  let sortValue;

  switch (query) {
    case "most-popular":
      sortValue = "vote_count.desc";
      break;
    case "trending-now":
      sortValue = "popularity.desc";
      break;
    case "most-recent":
      sortValue = `primary_release_date.desc&primary_release_date.lte=${todayDate}`;
      break;
    case "less-recent":
      sortValue = "primary_release_date.asc";
      break;
    case "upcoming":
      sortValue = `primary_release_date.desc&primary_release_date.gte=${todayDate}`;
      break;
  }

  const doQuery = () => {
    const isGenresPresent = genresList.some(
      (genre) => genre.name === newGenresName
    );
    return isGenresPresent;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [genresMatched?.id, page, sortValue],
    queryFn: () => fetchMovie(genresMatched.id, page, sortValue),
    refetchOnWindowFocus: false,
    enabled: doQuery(),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log(error);
    return <Error refetch={refetch} error={error} />;
  }

  return (
    <div className={style.wrapper}>
      {data ? (
        <>
          {" "}
          <Helmet>
            <title>{newGenresName} | FlickPicks</title>
          </Helmet>
          <NavbarLogged />
          <main className={isShown ? style.mainBurger : style.mainClass}>
            {isShown ? (
              <BurgerMenu />
            ) : (
              <div className={style.container}>
                <h1 className={style.title}>GENRES / {newGenresName}</h1>
                <div className={style.sortDiv}>
                  Sort by :{" "}
                  <SortMenu
                    data={genresName}
                    query={query
                      .split("-")
                      .map((item) => item[0].toUpperCase() + item.substring(1))
                      .join(" ")}
                  />
                </div>
                <div className={style.gridContainer}>
                  {data.map((item, i) => (
                    <Card key={i} data={item} />
                  ))}
                </div>
                <div className={style.changePageContainer}>
                  {page > 1 && (
                    <button
                      onClick={() => {
                        setPage((prevState) => prevState - 1);
                        navigate(
                          `/genres/${genresName}?sort_by=${query}&page=${
                            page - 1
                          }`
                        );
                      }}
                    >
                      Previous
                    </button>
                  )}
                  {data.total_pages !== page && (
                    <button
                      onClick={() => {
                        setPage((prevState) => prevState + 1);
                        navigate(
                          `/genres/${genresName}?sort_by=${query}&page=${
                            page + 1
                          }`
                        );
                      }}
                    >
                      Next
                    </button>
                  )}
                </div>
                <Arrow />
              </div>
            )}
          </main>
          <Footer />
        </>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
}
