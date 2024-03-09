import Dropdown from "../Dropdown/Dropdown";
import SearchInput from "../../components/SearchInput/SearchInput";
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
import { useState, useRef, useEffect } from "react";

export default function NavbarLogged() {
  const [isMovieDropdownMenuOpen, setIsMovieDropdownMenuOpen] = useState(false);
  const [isGenresDropdownMenuOpen, setIsGenresDropdownMenuOpen] =
    useState(false);

  const { isShown } = useSelector((state) => state.burgerMenuState);

  const dispatch = useDispatch();

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
        <div className={style.leftContainer}>
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
              {isMovieDropdownMenuOpen && <Dropdown isMovie={true} />}
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
              {isGenresDropdownMenuOpen && <Dropdown isMovie={false} />}
            </div>
            <SearchInput usedFor={"Navbar"} />
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
