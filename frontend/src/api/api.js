import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const loginUser = (data) => API.post("/login", data);

export const getProfile = (token) =>
  API.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const logoutUser = (token) =>
  API.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
