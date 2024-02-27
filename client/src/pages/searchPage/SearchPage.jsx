import style from "./SearchPage.module.scss";
import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import { useQuery } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchMovie from "./utils";
import { PulseLoader } from "react-spinners";
import { useSelector } from "react-redux";

export default function DiscoverPage() {
  const [page, setPage] = useState(1);

  const { isShown } = useSelector((state) => state.burgerMenuState);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const countQuery = parseInt(searchParams.get("page")) || 1;

  useEffect(() => setPage(countQuery), [countQuery]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [query, page],
    queryFn: () => fetchMovie(query, page),
    refetchOnWindowFocus: false,
  });

  console.log(data);

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
            <h1>Showing result for : &quot;{query}&quot;</h1>
            <div className={style.gridContainer}>
              {data.results.map((item, i) => (
                <Card key={i} data={item} />
              ))}
            </div>
            <div className={style.changePageContainer}>
              {page > 1 && (
                <button
                  onClick={() => {
                    setPage((prevState) => prevState - 1);
                    navigate(`/discover/search?q=${query}&page=${page - 1}`);
                  }}
                >
                  Previous
                </button>
              )}
              {data.total_pages !== page && (
                <button
                  onClick={() => {
                    setPage((prevState) => prevState + 1);
                    navigate(`/discover/search?q=${query}&page=${page + 1}`);
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
