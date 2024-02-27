import { IoMdSettings } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import style from "./BurgerMenu.module.scss";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideBurgerMenu } from "../../states/burgerMenu";

export default function BurgerMenu() {
  const [title, setTitle] = useState("");
  const [isMovieDropdownMenuOpen, setIsMovieDropdownMenuOpen] = useState(false);
  const [isGenresDropdownMenuOpen, setIsGenresDropdownMenuOpen] =
    useState(false);

  const { movieSections } = useSelector((state) => state.movieSectionsState);
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
  }, [isGenresDropdownMenuOpen, isMovieDropdownMenuOpen]);

  return (
    <div className={style.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(
            `/discover/search?q=${title.toLowerCase().replace(/ /g, "+")}`
          );
          dispatch(hideBurgerMenu());
        }}
      >
        <div className={style.inputDiv}>
          <input
            type="text"
            placeholder="Search titles"
            className={style.searchInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <IoSearch className={style.icon} />
        </div>
      </form>
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
                <span>Movie</span>
                <MdOutlineKeyboardArrowUp />
              </div>
              <div className={style.sections}>
                {movieSections.map((item, index) => (
                  <span
                    key={index}
                    onClick={() => {
                      switch (item.name) {
                        case "Daily Trending Movies":
                          navigate("/discover/movies/daily-trending");
                          dispatch(hideBurgerMenu());
                          break;
                        case "Weekly Trending Movies":
                          navigate("/discover/movies/weekly-trending");
                          dispatch(hideBurgerMenu());
                          break;
                        case "Top Rated Movies":
                          navigate("/discover/movies/top-rated");
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
              <span>Movie</span>
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
                          navigate("/genres/science-fiction");
                          dispatch(hideBurgerMenu());
                          break;
                        case "TV Movie":
                          navigate("/genres/tv-movie");
                          dispatch(hideBurgerMenu());
                          break;
                        default:
                          navigate(`/genres/${item.name.toLowerCase()}`);
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
      <div className={style.userDiv}>
        <Link to="/account" className={style.link}>
          <div className={style.authDiv}>
            <MdAccountCircle size={25} className={style.authIcon} />
            <span className={style.authText}>Account</span>
          </div>
        </Link>

        <Link to="/settings" className={style.link}>
          <div className={style.authDiv}>
            <IoMdSettings size={25} className={style.authIcon} />
            <span className={style.authText}>Settings</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
