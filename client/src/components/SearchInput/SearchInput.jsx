import style from "./SearchInput.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import PropTypes from "prop-types";

export default function SearchInput({ usedFor }) {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();
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
  );
}

SearchInput.propTypes = {
  usedFor: PropTypes.string.isRequired,
};
