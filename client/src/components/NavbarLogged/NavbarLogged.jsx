import Dropdown from "../Dropdown/Dropdown";
import SearchInput from "../../components/SearchInput/SearchInput";
import style from "./NavbarLogged.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { showBurgerMenu, hideBurgerMenu } from "../../states/burgerMenu";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function NavbarLogged() {
  const [isMovieDropdownMenuOpen, setIsMovieDropdownMenuOpen] = useState(false);
  const [isGenresDropdownMenuOpen, setIsGenresDropdownMenuOpen] =
    useState(false);

  const [confirmLogOut, setConfirmLogOut] = useState(false);

  const { isShown } = useSelector((state) => state.burgerMenuState);

  const { userData } = useSelector((state) => state.userDataState);

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

  const navigate = useNavigate();

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
          <Link to="/home" className={style.link}>
            <span className={style.title}>FlickPicks</span>
          </Link>
          <div className={style.discoverDiv}>
            <div
              className={
                isMovieDropdownMenuOpen
                  ? `${style.boxSlide} ${style.boxSlideActive}`
                  : style.boxSlide
              }
              onClick={() => {
                setIsMovieDropdownMenuOpen((prevState) => !prevState);
              }}
              ref={movieRef}
            >
              <span className={style.titleMenu}>Charts</span>
              {isMovieDropdownMenuOpen ? (
                <MdOutlineKeyboardArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown />
              )}
              {isMovieDropdownMenuOpen && <Dropdown isMovie={true} />}
            </div>

            <div
              className={
                isGenresDropdownMenuOpen
                  ? `${style.boxSlide} ${style.boxSlideActive}`
                  : style.boxSlide
              }
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
        <div className={style.profileContainer}>
          <Link to={`/users/${userData.userID}`} className={style.link}>
            <div className={style.profileDiv}>
              <MdAccountCircle size={25} />
              <span className={style.profileText}>Profile</span>
            </div>
          </Link>
          <span>|</span>

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
    </nav>
  );
}
