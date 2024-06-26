import SearchInput from "../../components/SearchInput/SearchInput";
import style from "./BurgerMenu.module.scss";
import { MdLogout } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideBurgerMenu } from "../../states/burgerMenu";
import axios from "axios";

export default function BurgerMenu() {
  const [isMovieDropdownMenuOpen, setIsMovieDropdownMenuOpen] = useState(false);
  const [isGenresDropdownMenuOpen, setIsGenresDropdownMenuOpen] =
    useState(false);

  const [confirmLogOut, setConfirmLogOut] = useState(false);

  const { charts } = useSelector((state) => state.chartsState);
  const { genresList } = useSelector((state) => state.genresState);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const movieRef = useRef();
  const genresRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!movieRef.current.contains(e.target)) {
        setIsMovieDropdownMenuOpen(false);
      }
      if (!genresRef.current.contains(e.target)) {
        setIsGenresDropdownMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logginOut = async () => {
    try {
      await axios.post("https://flickpicks-6ifw.onrender.com/logout");
      dispatch(hideBurgerMenu());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.container}>
      <SearchInput usedFor={"Burger"} />
      <div className={style.discoverDiv}>
        <div
          className={
            isMovieDropdownMenuOpen
              ? `${style.boxSlide} ${style.boxSlideOpen}`
              : style.boxSlide
          }
          onClick={() => {
            setIsMovieDropdownMenuOpen((prevState) => !prevState);
          }}
          ref={movieRef}
        >
          {isMovieDropdownMenuOpen ? (
            <>
              <div className={style.title}>
                <span>Charts</span>
                <MdOutlineKeyboardArrowUp />
              </div>
              <div className={style.sections}>
                {charts.map((item, index) => (
                  <span
                    key={index}
                    onClick={() => {
                      switch (item.name) {
                        case "Daily Trending Movies":
                          navigate("/discover/charts/daily-trending");
                          dispatch(hideBurgerMenu());
                          break;
                        case "Weekly Trending Movies":
                          navigate("/discover/charts/weekly-trending");
                          dispatch(hideBurgerMenu());
                          break;
                        case "Top Rated Movies":
                          navigate("/discover/charts/top-rated");
                          dispatch(hideBurgerMenu());
                          break;
                      }
                    }}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              <span>Charts</span>
              <MdOutlineKeyboardArrowDown />
            </>
          )}
        </div>
        <div
          className={
            isGenresDropdownMenuOpen
              ? `${style.boxSlide} ${style.boxSlideOpen}`
              : style.boxSlide
          }
          onClick={() => {
            setIsGenresDropdownMenuOpen((prevState) => !prevState);
          }}
          ref={genresRef}
        >
          {isGenresDropdownMenuOpen ? (
            <>
              <div className={style.title}>
                <span>Genres</span>
                <MdOutlineKeyboardArrowUp />
              </div>
              <div className={style.genres}>
                {genresList.map((item, index) => (
                  <span
                    key={index}
                    onClick={() => {
                      switch (item.name) {
                        case "Science Fiction":
                          navigate("/discover/genres/science-fiction");
                          dispatch(hideBurgerMenu());
                          break;
                        case "TV Movie":
                          navigate("/discover/genres/tv-movie");
                          dispatch(hideBurgerMenu());
                          break;
                        default:
                          navigate(
                            `/discover/genres/${item.name.toLowerCase()}`
                          );
                          dispatch(hideBurgerMenu());
                          break;
                      }
                    }}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              <span>Genres</span>
              <MdOutlineKeyboardArrowDown />
            </>
          )}
        </div>
      </div>
      <div className={style.profileContainer}>
        <div
          className={style.profileDiv}
          onClick={() => {
            navigate("/users/me");
            dispatch(hideBurgerMenu());
          }}
        >
          <MdAccountCircle size={25} className={style.authIcon} />
          <span className={style.profileText}>Profile</span>
        </div>

        <div
          className={
            confirmLogOut
              ? `${style.confirmLogOut} ${style.logOutDiv}`
              : style.logOutDiv
          }
          onClick={() => {
            if (confirmLogOut) {
              logginOut();
            } else if (!confirmLogOut) {
              setConfirmLogOut(true);
              setTimeout(() => setConfirmLogOut(false), 5000);
            }
          }}
        >
          <MdLogout size={25} />
          <span className={style.logOutText}>Logout</span>
        </div>
      </div>
    </div>
  );
}
