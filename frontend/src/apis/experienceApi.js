import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line import/prefer-default-export
export const GetAllExperiences = () => {
  return axios.get(apiUrl + "experience/");
};
