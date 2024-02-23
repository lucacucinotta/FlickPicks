import style from "./Dropdown.module.scss";
import PropTypes from "prop-types";

export default function Dropdown({ data, isMovie }) {
  return (
    <div
      className={
        isMovie
          ? style.container
          : `${style.container} ${style.containerGenres}`
      }
    >
      {data.map((item, index) => (
        <span key={index} className={style.text}>
          {item.name}
        </span>
      ))}
    </div>
  );
}

Dropdown.propTypes = {
  data: PropTypes.array.isRequired,
  isMovie: PropTypes.bool.isRequired,
};
