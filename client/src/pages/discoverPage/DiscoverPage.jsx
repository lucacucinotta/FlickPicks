import style from "./discoverPage.module.scss";
import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchMovie from "./utils";
import { PulseLoader } from "react-spinners";
import { useSelector } from "react-redux";

export default function DiscoverPage() {
  const { isShown } = useSelector((state) => state.burgerMenuState);

  const navigate = useNavigate();

  const { section } = useParams();

  const [page, setPage] = useState(1);

  const countQuery =
    parseInt(new URLSearchParams(window.location.search).get("page")) || 1;

  useEffect(() => {
    setPage(countQuery);
  }, [section, countQuery]);

  //variabile per mostrare il nome della sezione nella pagina
  let sectionName;

  //variabile che conterrà l'url
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
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [url, page],
    queryFn: () => fetchMovie(url, page),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className={style.loadingDiv}>
        <PulseLoader size={50} color="#0074e4" />
      </div>
    );
  }

  if (isError) {
    navigate("*");
    console.log(error);
  }

  console.log(data);

  return (
    <div className={style.wrapper}>
      <NavbarLogged />
      <main className={isShown ? style.mainBurger : null}>
        {isShown ? (
          <BurgerMenu />
        ) : (
          <div className={style.container}>
            <h1>{sectionName}</h1>
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
                    navigate(`/discover/movies/${section}/?page=${page - 1}`);
                  }}
                >
                  Previous
                </button>
              )}
              <button
                onClick={() => {
                  setPage((prevState) => prevState + 1);
                  navigate(`/discover/movies/${section}?page=${page + 1}`);
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
