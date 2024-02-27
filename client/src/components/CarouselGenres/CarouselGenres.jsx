import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./CarouselGenres.module.scss";

function CarouselGenres() {
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

  const { genresList } = useSelector((state) => state.genresState);
  const navigate = useNavigate();
  return (
    <Slider {...settings}>
      {genresList.map((item, index) => (
        <div key={index} className={style.divWrapper}>
          <div
            className={style.card}
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
            <p>{item.name}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CarouselGenres;
