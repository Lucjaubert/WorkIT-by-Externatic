import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line import/prefer-default-export

export const GetAllFavorites = () => {
  return axios.get(apiUrl + "favorite");
};

export const GetFavoriteByUserAndOffer = (user_id, offer_id) => {
  return axios.get(
    apiUrl + "favorite/user/" + `?user_id=${user_id}&offer_id=${offer_id}`
  );
};
export const PostFavorite = (user_id, offer_id) => {
  return axios.post(apiUrl + "favorite", { user_id, offer_id });
};
export const DeleteFavorite = (id) => {
  return axios.delete(apiUrl + "favorite/" + id);
};
export const AllFavoriteId = (id) => {
  return axios.get(apiUrl + "favorite/user/" + id);
};
