import axios from "axios";

const SECRET_TOKEN = import.meta.env.VITE_SECRET_TOKEN;

const fetchMovie = async (title, pageNumber) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${title}&page=${pageNumber}`,
    {
      withCredentials: false,
      headers: {
        accept: "application/json",
        Authorization: SECRET_TOKEN,
      },
    }
  );
  return res.data;
};

export default fetchMovie;
