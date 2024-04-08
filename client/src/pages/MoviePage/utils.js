import axios from "axios";

const SECRET_TOKEN = import.meta.env.VITE_SECRET_TOKEN;

export const fetchMovie = async (movieID) => {
  const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}`, {
    withCredentials: false,
    headers: {
      accept: "application/json",
      Authorization: SECRET_TOKEN,
    },
  });
  return res.data;
};

export const fetchCredits = async (movieID) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}/credits`,
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

export const updateMovieList = async (movieID, action, list) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.put(
      `https://flickpicks-6ifw.onrender.com/users/me/lists/${list}`,
      {
        movieID: movieID,
        action: action,
      }
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
