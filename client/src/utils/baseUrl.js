import axios from "axios";

export const sentRequest = axios.create({
  baseURL: "https://mysql-crud-lb8n.onrender.com/api",
  timeout: 5000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
