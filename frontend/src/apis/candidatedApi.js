import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line import/prefer-default-export

export const GetAllCandidated = () => {
  return axios.get(apiUrl + "candidated");
};

export const GetCandidatedByUserAndOffer = (user_id, offer_id) => {
  return axios.get(
    apiUrl + "candidated/user/" + `?user_id=${user_id}&offer_id=${offer_id}`
  );
};
export const PostCandidated = (user_id, offer_id) => {
  return axios.post(apiUrl + "candidated", { user_id, offer_id });
};
export const DeleteCandidated = (id) => {
  return axios.delete(apiUrl + "candidated/" + id);
};
export const GetCandidatedsByUser = (user_id) => {
  return axios.get(apiUrl + "candidated/user/" + user_id);
};
