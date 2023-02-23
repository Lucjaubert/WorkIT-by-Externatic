import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const requestApi = (finalUrl, email, password) => {
  return axios
    .post(apiUrl + finalUrl, { email, password }, { withCredentials: true })
    .then((response) => response.data);
};

// eslint-disable-next-line import/prefer-default-export
export const CreateUser = (profile) => {
  return axios
    .post(apiUrl + "user/createprofile", profile)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const loginUser = (email, password) => {
  return requestApi("user/login", email, password);
};
