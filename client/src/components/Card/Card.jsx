import style from "./Card.module.scss";
import PropTypes from "prop-types";
import PlaceholderImg from "../../assets/images.png";
import { useNavigate } from "react-router-dom";

export default function Card({ data }) {
  const navigate = useNavigate();
  return (
    <div className={style.card}>
      <img
        src={
          data.poster_path
            ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
            : PlaceholderImg
        }
        className={style.locandine}
        onClick={() => navigate(`/movie/${data.id}`)}
      />
      <span className={style.title}>{data.title}</span>
      <div className={style.extraInfo}>
        <span>
          {data.release_date ? data.release_date.substring(0, 4) : null}
        </span>
        <span>{data.vote_average >= 1 && "•"}</span>
        <span>
          {data.vote_average >= 1
            ? `${data.vote_average.toString().substring(0, 3)} | ${
                data.vote_count
              } ${data.vote_count > 1 ? "votes" : "vote"}`
            : null}
        </span>
      </div>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
};
