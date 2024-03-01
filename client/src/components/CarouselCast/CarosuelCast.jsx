import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PropTypes from "prop-types";
import style from "./CarouselCast.module.scss";
import PlaceholderImg from "../../assets/images.png";

function CarouselCast({ data }) {
  var settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 6,
    slidesToScroll: 6,
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
    <div className={style.container}>
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index} className={style.card}>
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
    </div>
  );
}

export default CarouselCast;
CarouselCast.propTypes = {
  data: PropTypes.array.isRequired,
};
