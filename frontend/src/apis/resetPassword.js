import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line import/prefer-default-export
export const resetPassword = (userEmail) => {
  return axios.put(apiUrl + "user/resetPassword", { email: userEmail });
};
