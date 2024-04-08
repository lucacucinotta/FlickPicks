import style from "./Dropdown.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function Dropdown({ isMovie }) {
  const { charts } = useSelector((state) => state.chartsState);
  const { genresList } = useSelector((state) => state.genresState);

  const navigate = useNavigate();

  return isMovie ? (
    <div className={style.container}>
      {charts.map((item, index) => (
        <span
          key={index}
          className={style.text}
          onClick={() => {
            switch (item.name) {
              case "Daily Trending Movies":
                navigate("/discover/charts/daily-trending");
                break;
              case "Weekly Trending Movies":
                navigate("/discover/charts/weekly-trending");
                break;
              case "Top Rated Movies":
                navigate("/discover/charts/top-rated");
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
      {genresList.map((item, index) => (
        <span
          key={index}
          className={style.text}
          onClick={() => {
            switch (item.name) {
              case "Science Fiction":
                navigate("/discover/genres/science-fiction");
                break;
              case "TV Movie":
                navigate("/discover/genres/tv-movie");
                break;
              default:
                navigate(`/discover/genres/${item.name.toLowerCase()}`);
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
  isMovie: PropTypes.bool.isRequired,
};
