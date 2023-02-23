// eslint-disable-next-line import/prefer-default-export
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const requestApi = (finalUrl, data) => {
  return axios.put(apiUrl + finalUrl, data).then((response) => response.data);
};

// eslint-disable-next-line import/prefer-default-export
export const UpdateFirm = (firm) => {
  return requestApi(`firm/${firm.id}`, firm);
};
