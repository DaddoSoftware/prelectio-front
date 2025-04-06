import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export function getPlayerPositions() {
  return axios({
    method: "get",
    url: "/athlete/player-position",
    baseURL: BASE_URL,
  });
}

export function getSkills() {
  return axios({
    method: "get",
    url: "/athlete/skills",
    baseURL: BASE_URL,
  });
}

export function getPredominantTraits() {
  return axios({
    method: "get",
    url: "/athlete/predominant-trait",
    baseURL: BASE_URL,
  });
}
