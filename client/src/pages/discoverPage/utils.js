import axios from "axios";

const fetchMovie = async (url, pageNumber) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/${url}?&page=${pageNumber}`,
    {
      withCredentials: false,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODgwM2IzZjFmYjc3NTE3OGFmM2FkMTViYjgwMzk5MCIsInN1YiI6IjY1YmU0YzdhMWRiYzg4MDE2MzFjMjcyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IbaJJct8Vm-mpsZEeYhNPIGNeTDnhDOiUrpdGNMPxTc",
      },
    }
  );
  return res.data.results;
};

export default fetchMovie;
