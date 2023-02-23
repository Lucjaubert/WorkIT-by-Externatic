import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line import/prefer-default-export

export const GetUserAlerts = (job_id, city) => {
  return axios.get(apiUrl + "userAlert/?" + `job_id=${job_id}&city=${city}`);
};

export const GetMyUserAlerts = (user_id) => {
  return axios.get(apiUrl + "userAlert/myUserAlerts/" + user_id);
};

export const DeleteMyUserAlert = (userAlert_id) => {
  return axios.delete(apiUrl + "userAlert/delete/" + userAlert_id);
};

export const AddUserAlert = (user_id, job_id, city) => {
  return axios.post(apiUrl + "userAlert/create", {
    user_id,
    job_id,
    city,
  });
};
