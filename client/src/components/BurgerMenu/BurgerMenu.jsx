import { IoMdSettings } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import style from "./BurgerMenu.module.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  openMovieDropdownMenu,
  closeMovieDropdownMenu,
} from "../../states/movieDropdown";
import {
  openGenresDropdownMenu,
  closeGenresDropdownMenu,
} from "../../states/genresDropdown";

export default function BurgerMenu() {
  const { isMovieDropdownMenuOpen } = useSelector(
    (state) => state.movieDropdownState
  );
  const { isGenresDropdownMenuOpen } = useSelector(
    (state) => state.genresDropdownState
  );

  const { movieSections } = useSelector((state) => state.movieSectionsState);
  const { genresList } = useSelector((state) => state.genresState);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  return (
    <div className={style.container}>
      <form>
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
            if (isMovieDropdownMenuOpen) {
              dispatch(closeMovieDropdownMenu());
            } else {
              dispatch(openMovieDropdownMenu());
            }
          }}
        >
          {isMovieDropdownMenuOpen ? (
            <>
              <div className={style.title}>
                <span>Movie</span>
                <MdOutlineKeyboardArrowUp />
              </div>
              <div className={style.sections}>
                {movieSections.map((item, index) => (
                  <span key={index}>{item.name}</span>
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
            if (isGenresDropdownMenuOpen) {
              dispatch(closeGenresDropdownMenu());
            } else {
              dispatch(openGenresDropdownMenu());
            }
          }}
        >
          {isGenresDropdownMenuOpen ? (
            <>
              <div className={style.title}>
                <span>Genres</span>
                <MdOutlineKeyboardArrowUp />
              </div>
              <div className={style.genres}>
                {genresList.map((item, index) => (
                  <span key={index}>{item.name}</span>
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
