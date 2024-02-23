import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PropTypes from "prop-types";
import style from "./CarouselMovie.module.scss";
import { useNavigate } from "react-router-dom";

function CarouselMovie({ data }) {
  const navigate = useNavigate();
  var settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1170,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 586,
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
  return (
    <Slider {...settings}>
      {data.map((item, index) => (
        <div key={index} className={style.card}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            className={style.locandine}
            onClick={() => navigate(`/film/${item.id}`)}
          />
        </div>
      ))}
    </Slider>
  );
}

export default CarouselMovie;
CarouselMovie.propTypes = {
  data: PropTypes.array.isRequired,
};
