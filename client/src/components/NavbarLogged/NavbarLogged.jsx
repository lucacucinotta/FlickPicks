import style from "./NavbarLogged.module.scss";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { showBurgerMenu, hideBurgerMenu } from "../../states/burgerMenu";
import {
  openMovieDropdownMenu,
  closeMovieDropdownMenu,
} from "../../states/movieDropdown";
import {
  openGenresDropdownMenu,
  closeGenresDropdownMenu,
} from "../../states/genresDropdown";
import Dropdown from "../Dropdown/Dropdown";
import { useRef, useEffect } from "react";

export default function NavbarLogged() {
  const { isShown } = useSelector((state) => state.burgerMenuState);

  const { isMovieDropdownMenuOpen } = useSelector(
    (state) => state.movieDropdownState
  );
  const { isGenresDropdownMenuOpen } = useSelector(
    (state) => state.genresDropdownState
  );

  const { movieSections } = useSelector((state) => state.movieSectionsState);
  console.log(movieSections);
  const { genresList } = useSelector((state) => state.genresState);

  const dispatch = useDispatch();

  const movieRef = useRef();
  const genresRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!movieRef.current.contains(e.target)) {
        dispatch(closeMovieDropdownMenu());
      }
      if (!genresRef.current.contains(e.target)) {
        dispatch(closeGenresDropdownMenu());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

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
                if (isMovieDropdownMenuOpen) {
                  dispatch(closeMovieDropdownMenu());
                } else {
                  dispatch(openMovieDropdownMenu());
                }
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
                <Dropdown data={movieSections} isFilm={true} />
              )}
            </div>

            <div
              className={style.boxSlide}
              onClick={() => {
                if (isGenresDropdownMenuOpen) {
                  dispatch(closeGenresDropdownMenu());
                } else {
                  dispatch(openGenresDropdownMenu());
                }
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
