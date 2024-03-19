import axios from "axios";

const SECRET_TOKEN = import.meta.env.VITE_SECRET_TOKEN;

const fetchMovie = async (genresID, pageNumber, sortValue) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?page=${pageNumber}&sort_by=${sortValue}&with_genres=${genresID}`,
    {
      withCredentials: false,
      headers: {
        accept: "application/json",
        Authorization: SECRET_TOKEN,
      },
    }
  );
  return res.data.results;
};

export default fetchMovie;
