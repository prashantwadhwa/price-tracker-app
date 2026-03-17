import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const trackProduct = async (url) => {
  const res = await API.post("/track", { url });
  return res.data;
};
