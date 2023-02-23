import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line import/prefer-default-export
export const GetAllJobs = () => {
  return axios.get(apiUrl + "job/");
};

export const GetAllJobsTitles = () => {
  return axios.get(apiUrl + "job/jobtitles/");
};

export const GetJobById = (id) => {
  return axios.get(apiUrl + "job/" + id);
};
