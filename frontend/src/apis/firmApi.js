// eslint-disable-next-line import/prefer-default-export
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line import/prefer-default-export
export const GetFirmData = (id) => {
  return axios.get(`${apiUrl}firm/${id}`);
};

export const GetFirmOffer = (id) => {
  return axios.get(`${apiUrl}offer/firm/${id}`);
};

export const CreateFirm = (firm) => {
  return axios.post(`${apiUrl}firm/createFirm`, firm);
};

export const DeleteFirm = (id) => {
  return axios.delete(`${apiUrl}firm/deleteFirm/${id}`);
};

export const UpdateFirm = (firm, id) => {
  return axios.put(`${apiUrl}firm/updateFirm/${id}`, firm);
};
