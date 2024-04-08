import style from "./SearchInput.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { hideBurgerMenu } from "../../states/burgerMenu";
import PropTypes from "prop-types";

export default function SearchInput({ usedFor }) {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <form
      id="search"
      name="search"
      className={
        usedFor === "Navbar"
          ? `${style.searchForm} ${style.navForm}`
          : usedFor === "Burger"
          ? `${style.searchForm} ${style.burgerForm}`
          : `${style.searchForm} ${style.searchPageForm}`
      }
      onSubmit={(e) => {
        e.preventDefault();
        navigate(
          `/discover/search?q=${title.toLowerCase().replace(/ /g, "+")}`
        );
        if (usedFor === "Burger") {
          dispatch(hideBurgerMenu());
        }
      }}
    >
      <div className={style.inputDiv}>
        <input
          id="searchText"
          type="text"
          placeholder="Search titles"
          className={style.searchInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <IoSearch className={style.icon} />
      </div>
    </form>
  );
}

SearchInput.propTypes = {
  usedFor: PropTypes.string.isRequired,
};
