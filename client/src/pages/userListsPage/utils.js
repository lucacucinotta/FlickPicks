import axios from "axios";

const SECRET_TOKEN = import.meta.env.VITE_SECRET_TOKEN;

export const getUserLists = async () => {
  axios.defaults.withCredentials = true;
  const res = await axios.get(
    "https://flickpicks-6ifw.onrender.com/getUserLists"
  );
  return res.data.userLists;
};

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

export const getMovieData = async (userLists, field) => {
  let movieData = [];
  if (userLists[field].length > 0) {
    for (const id of userLists[field]) {
      const data = await fetchMovie(id);
      movieData.push(data);
    }
  }
  return movieData;
};
