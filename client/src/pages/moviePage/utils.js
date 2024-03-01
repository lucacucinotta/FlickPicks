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

export const fetchCast = async (movieID) => {
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
  return res.data.cast;
};

export const addFilmWatched = async (movieID) => {
  try {
    axios.defaults.withCredentials = true;
    await axios.put("http://localhost:8081/filmWatched", {
      movieID: movieID,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addFilmFavorite = async (movieID) => {
  try {
    axios.defaults.withCredentials = true;
    await axios.put("http://localhost:8081/filmFavorite", {
      movieID: movieID,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addFilmWatchlist = async (movieID) => {
  try {
    axios.defaults.withCredentials = true;
    await axios.put("http://localhost:8081/filmWatchlist", {
      movieID: movieID,
    });
  } catch (err) {
    console.log(err);
  }
};
