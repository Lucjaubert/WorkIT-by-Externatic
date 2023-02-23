import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line import/prefer-default-export

export const GetAllCities = () => {
  return axios.get(apiUrl + "offer/cities");
};

export const FilterOffer = (city, selectedJob, salary, choosenDate, limit) => {
  const apiRequest = "offer/state/?";
  const cityRequest = city == "" ? "" : `city=${city}&`;
  const jobRequest = selectedJob == "" ? "" : `job_id=${selectedJob}&`;
  const salaryRequest = salary == 0 ? "" : `salary=${salary}&`;
  const dateRequest = choosenDate == "" ? "" : `date=${choosenDate}&`;
  const limitRequest = limit == undefined ? "limit=5" : `limit=${limit}`;

  return axios.get(
    apiUrl +
      `${apiRequest}${cityRequest}${jobRequest}${salaryRequest}${dateRequest}${limitRequest}`
  );
};

export const GetOfferById = (id) => {
  return axios.get(apiUrl + "offer/" + id);
};

export const DeleteOfferById = (id) => {
  return axios.delete(apiUrl + "offer/" + id);
};

export const PostOffer = (offer) => {
  return axios.post(apiUrl + "offer/create/", offer);
};

export const UpdateOffer = (offer, id) => {
  return axios.put(apiUrl + "offer/update/" + id, offer);
};

export const GetOnlyOfferInfos = (id) => {
  return axios.get(apiUrl + "offer/onlyOffer/" + id);
};
