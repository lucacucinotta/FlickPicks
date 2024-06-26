import style from "./SortMenu.module.scss";
import { useState, useEffect, useRef } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function SortMenu({ data, query }) {
  const [isOpen, setIsOpen] = useState();

  const sortMenuRef = useRef();

  const sortMenuOption = [
    "Most Popular",
    "Trending Now",
    "Most Recent",
    "Less Recent",
    "Upcoming",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!sortMenuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  return (
    <div className={style.sortMenuContainer} ref={sortMenuRef}>
      <div
        className={
          isOpen
            ? `${style.selectedContainer} ${style.selectedContainerOpen}`
            : style.selectedContainer
        }
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <span>{query || "Most Popular"}</span>
        {isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
      </div>
      {isOpen && (
        <div className={style.list}>
          {sortMenuOption.map((item, i) => (
            <span
              key={i}
              className={style.option}
              onClick={() => {
                setIsOpen(false);
                navigate(
                  `/discover/genres/${data}?sort_by=${item
                    .toLowerCase()
                    .replace(/ /g, "-")}`
                );
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

SortMenu.propTypes = {
  data: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};
