import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const requestApi = (finalUrl) => {
  return axios.get(apiUrl + finalUrl).then((response) => response.data);
};

// eslint-disable-next-line import/prefer-default-export
export const GetMyAlerts = () => {
  return requestApi("offer/");
};
