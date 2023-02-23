import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line import/prefer-default-export

export const LaunchAlerts = (user_id, offer_id) => {
  return axios.post(apiUrl + "alert", { user_id, offer_id });
};

export const GetAlerts = (id) => {
  return axios.get(apiUrl + "alert/" + id);
};

export const DeleteAlert = (id) => {
  return axios.delete(apiUrl + "alert/" + id);
};
