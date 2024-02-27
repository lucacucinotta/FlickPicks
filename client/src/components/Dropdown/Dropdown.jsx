import style from "./Dropdown.module.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function Dropdown({ data, isMovie }) {
  const navigate = useNavigate();
  // const { selected } = useSelector((state) => state.sortState);
  return isMovie ? (
    <div className={style.container}>
      {data.map((item, index) => (
        <span
          key={index}
          className={style.text}
          onClick={() => {
            switch (item.name) {
              case "Daily Trending Movies":
                navigate("/discover/movies/daily-trending");
                break;
              case "Weekly Trending Movies":
                navigate("/discover/movies/weekly-trending");
                break;
              case "Top Rated Movies":
                navigate("/discover/movies/top-rated");
                break;
            }
          }}
        >
          {item.name}
        </span>
      ))}
    </div>
  ) : (
    <div className={`${style.container} ${style.containerGenres}`}>
      {data.map((item, index) => (
        <span
          key={index}
          className={style.text}
          onClick={() => {
            switch (item.name) {
              case "Science Fiction":
                navigate("/genres/science-fiction");
                break;
              case "TV Movie":
                navigate("/genres/tv-movie");
                break;
              default:
                navigate(`/genres/${item.name.toLowerCase()}`);
                break;
            }
          }}
        >
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
