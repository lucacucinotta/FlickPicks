import axios from "axios";

const SECRET_TOKEN = import.meta.env.VITE_SECRET_TOKEN;

const fetchMovie = async (movieID) => {
  const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}`, {
    withCredentials: false,
    headers: {
      accept: "application/json",
      Authorization: SECRET_TOKEN,
    },
  });
  return res.data;
};

export default fetchMovie;
