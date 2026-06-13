import axios from "axios";

const api = axios.create({
  baseURL: "https://starbit-backend-1k5x.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
