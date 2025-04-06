import axios from "axios";
import GetToken from "../config/getToken";

const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location = "/login";
    }

    return Promise.reject(error);
  }
);

export function RegisterDeportistaService(data) {
  return axiosInstance({
    method: "post",
    url: "user/create-full",
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
    headers: { "Content-Type": "application/json" },
  });
}

export function GetMessagesDeportista(data) {
  return axiosInstance({
    method: "get",
    url: "api/mensaje/getByPara/" + data.id,
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
export function ChangeMessageOpened(data) {
  return axiosInstance({
    method: "put",
    url: "api/mensaje/cambiarLeido/" + data.id,
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}

export function GetDeportistas(data) {
  return axiosInstance({
    method: "get",
    url: "api/deportista",
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Authorization: GetToken(),
    },
    data: data,
  });
}

export function GetDeportistaById(id) {
  return axiosInstance({
    method: "get",
    url: "api/deportista/getById/" + id,
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Authorization: GetToken(),
    },
  });
}
