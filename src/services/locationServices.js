import axios from "axios";

export function getDepartamentos() {
  return axios({
    method: "get",
    url: "api/departamento",
    baseURL: process.env.REACT_APP_BASE_URL,
  });
}

export function getCiudades() {
  return axios({
    method: "get",
    url: "api/ciudad",
    baseURL: process.env.REACT_APP_BASE_URL,
  });
}

export function getMunicipalities() {
  return axios({
    method: "get",
    url: "location/municipalities",
    baseURL: process.env.REACT_APP_BASE_URL,
  })
}
