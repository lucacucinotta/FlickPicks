import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import Arrow from "../../components/Arrow/Arrow";
import SearchInput from "../../components/SearchInput/SearchInput";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Error from "../../components/Error/Error";
import style from "./SearchPage.module.scss";
import fetchMovie from "./utils";
import { useQuery } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function DiscoverPage() {
  const [page, setPage] = useState(1);

  const { isShown } = useSelector((state) => state.burgerMenuState);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const countQuery = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    setPage(countQuery);
  }, [countQuery]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [query, page],
    queryFn: () => fetchMovie(query, page),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log(error);
    return <Error refetch={refetch} />;
  }

  return (
    <div className={style.wrapper}>
      <NavbarLogged />
      <main
        className={
          isShown
            ? style.mainBurger
            : data.results.length >= 1
            ? null
            : style.mainNoResults
        }
      >
        {isShown ? (
          <BurgerMenu />
        ) : (
          <div className={style.container}>
            {data.results.length >= 1 ? (
              <>
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
                        navigate(
                          `/discover/search?q=${query}&page=${page - 1}`
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
                          `/discover/search?q=${query}&page=${page + 1}`
                        );
                      }}
                    >
                      Next
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className={style.noResultDiv}>
                <AiOutlineCloseCircle className={style.icon} />
                <h1>There are no results for &quot;{query}&quot;</h1>
                <p>Please retry with another search.</p>
                <SearchInput usedFor={"SearchPage"} />
              </div>
            )}
          </div>
        )}
        {data.results && data.results.length > 5 && <Arrow />}
      </main>
      <Footer />
    </div>
  );
}
