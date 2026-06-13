import axios from "axios";

const api = axios.create({
  baseURL: "https://starbit-backend-1k5x.onrender.com",
});

export default api;
