import axios from "axios";

const url = process.env.NODE_ENV == "production"?`${process.env.API_PUBLIC}/api`:"http://localhost:3000/api"

const api = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
