import axios from "axios";

const SECRET_TOKEN = import.meta.env.VITE_SECRET_TOKEN;

export const getUserData = async () => {
  axios.defaults.withCredentials = true;
  const res = await axios.get("https://flickpicks-6ifw.onrender.com/users/me");
  return res.data;
};

export const fetchMovie = async (url) => {
  const res = await axios.get(url, {
    withCredentials: false,
    headers: {
      accept: "application/json",
      Authorization: SECRET_TOKEN,
    },
  });
  return res.data;
};
