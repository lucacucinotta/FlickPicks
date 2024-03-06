import axios from "axios";

export const fetchMovie = async (movieID) => {
  const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}`, {
    withCredentials: false,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODgwM2IzZjFmYjc3NTE3OGFmM2FkMTViYjgwMzk5MCIsInN1YiI6IjY1YmU0YzdhMWRiYzg4MDE2MzFjMjcyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IbaJJct8Vm-mpsZEeYhNPIGNeTDnhDOiUrpdGNMPxTc",
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODgwM2IzZjFmYjc3NTE3OGFmM2FkMTViYjgwMzk5MCIsInN1YiI6IjY1YmU0YzdhMWRiYzg4MDE2MzFjMjcyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IbaJJct8Vm-mpsZEeYhNPIGNeTDnhDOiUrpdGNMPxTc",
      },
    }
  );
  return res.data;
};

export const addMovieWatched = async (movieID) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.put("http://localhost:8081/watchedList", {
      movieID: movieID,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const removeMovieWatched = async (movieID) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.put("http://localhost:8081/removeWatchedList", {
      movieID: movieID,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const addMovieFavorite = async (movieID) => {
  try {
    axios.defaults.withCredentials = true;
    await axios.put("http://localhost:8081/favoriteList", {
      movieID: movieID,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeMovieFavorite = async (movieID) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.put("http://localhost:8081/removeFavoriteList", {
      movieID: movieID,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const addMovieWatchlist = async (movieID) => {
  try {
    axios.defaults.withCredentials = true;
    await axios.put("http://localhost:8081/watchList", {
      movieID: movieID,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeMovieWatchList = async (movieID) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.put("http://localhost:8081/removeWatchList", {
      movieID: movieID,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
