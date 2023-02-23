// eslint-disable-next-line import/prefer-default-export
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const requestApi = (finalUrl, data) => {
  return axios.put(apiUrl + finalUrl, data).then((response) => response.data);
};

// eslint-disable-next-line import/prefer-default-export
export const UpdateUser = (user) => {
  return requestApi(`user/${user.id}`, user);
};

export const UpdateUserFile = (user) => {
  return axios
    .put(apiUrl + `user/upload/${user.id}`, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export const UpdateUserPhoto = (user) => {
  return axios
    .put(apiUrl + `user/uploadPhoto/${user.id}`, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};
