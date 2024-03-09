import style from "./Dropdown.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function Dropdown({ isMovie }) {
  const { movieSections } = useSelector((state) => state.movieSectionsState);
  const { genresList } = useSelector((state) => state.genresState);

  const navigate = useNavigate();

  return isMovie ? (
    <div className={style.container}>
      {movieSections.map((item, index) => (
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
      {genresList.map((item, index) => (
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
  isMovie: PropTypes.bool.isRequired,
};
