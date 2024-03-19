import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PropTypes from "prop-types";
import style from "./CarouselMovie.module.scss";
import PlaceholderImg from "../../assets/images.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CarouselMovie({ data, type }) {
  const navigate = useNavigate();

  const { genresList } = useSelector((state) => state.genresState);

  var settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return type === "movies" ? (
    <Slider {...settings}>
      {data.map((item, index) => (
        <div key={index} className={`${style.card} ${style.movieCard}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            className={style.locandine}
            onClick={() => navigate(`/movie/${item.id}`)}
          />
        </div>
      ))}
    </Slider>
  ) : type === "genres" ? (
    <Slider {...settings}>
      {genresList.map((item, index) => (
        <div key={index} className={style.card}>
          <div
            className={style.genresBox}
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
              }
            }}
          >
            <p className={style.genre}>{item.name}</p>
          </div>
        </div>
      ))}
    </Slider>
  ) : (
    <Slider {...settings}>
      {data.map((item, index) => (
        <div key={index} className={`${style.card} ${style.castCard}`}>
          <img
            src={
              item.profile_path
                ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                : PlaceholderImg
            }
            className={style.locandine}
          />
          <div className={style.person}>
            <span>{item.original_name}</span>
            <span>{item.character.toUpperCase()}</span>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CarouselMovie;
CarouselMovie.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string.isRequired,
};
