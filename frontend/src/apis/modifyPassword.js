import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line import/prefer-default-export
export const modifyPassword = (id, password) => {
  return axios.put(apiUrl + `user/changePassword/${id}`, { password });
};
