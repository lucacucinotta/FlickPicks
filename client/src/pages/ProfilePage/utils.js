import axios from "axios";

export const getUserData = async () => {
  axios.defaults.withCredentials = true;
  const res = await axios.get("https://flickpicks-6ifw.onrender.com/users/me");
  return res.data;
};
