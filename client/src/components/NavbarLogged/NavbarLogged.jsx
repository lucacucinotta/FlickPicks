import style from "./NavbarLogged.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { showBurgerMenu, hideBurgerMenu } from "../../states/burgerMenu";
import Dropdown from "../Dropdown/Dropdown";
import { useState, useRef, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

export default function NavbarLogged() {
  const [title, setTitle] = useState("");
  const [isMovieDropdownMenuOpen, setIsMovieDropdownMenuOpen] = useState(false);
  const [isGenresDropdownMenuOpen, setIsGenresDropdownMenuOpen] =
    useState(false);

  const { isShown } = useSelector((state) => state.burgerMenuState);

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
  }, []);

  return (
    <nav>
      <div className={style.navWrapper}>
        {isShown ? (
          <IoCloseOutline
            size={25}
            onClick={() => dispatch(hideBurgerMenu())}
            className={style.burgerIcon}
          />
        ) : (
          <IoIosMenu
            size={25}
            onClick={() => {
              dispatch(showBurgerMenu());
            }}
            className={style.burgerIcon}
          />
        )}
        <div className={style.titleContainer}>
          <Link to="/" className={style.link}>
            <span className={style.title}>FlickPicks</span>
          </Link>
          <div className={style.discoverDiv}>
            <div
              className={style.boxSlide}
              onClick={() => {
                setIsMovieDropdownMenuOpen((prevState) => !prevState);
              }}
              ref={movieRef}
            >
              <span className={style.titleMenu}>Movie</span>
              {isMovieDropdownMenuOpen ? (
                <MdOutlineKeyboardArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown />
              )}
              {isMovieDropdownMenuOpen && (
                <Dropdown data={movieSections} isMovie={true} />
              )}
            </div>

            <div
              className={style.boxSlide}
              onClick={() => {
                setIsGenresDropdownMenuOpen((prevState) => !prevState);
              }}
              ref={genresRef}
            >
              <span className={style.titleMenu}>Genres</span>
              {isGenresDropdownMenuOpen ? (
                <MdOutlineKeyboardArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown />
              )}
              {isGenresDropdownMenuOpen && (
                <Dropdown data={genresList} isMovie={false} />
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate(
                  `/discover/search?q=${title.toLowerCase().replace(/ /g, "+")}`
                );
                window.location.reload();
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
          </div>
        </div>
        <div className={style.authContainer}>
          <Link to="/account" className={style.link}>
            <div className={style.authDiv}>
              <MdAccountCircle size={25} />
              <span className={style.authText}>Account</span>
            </div>
          </Link>
          <span>|</span>

          <Link to="/settings" className={style.link}>
            <div className={style.authDiv}>
              <IoMdSettings size={25} />
              <span className={style.authText}>Settings</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
