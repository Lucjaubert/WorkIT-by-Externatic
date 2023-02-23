// eslint-disable-next-line import/prefer-default-export
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const requestApi = (finalUrl) => {
  return axios.get(apiUrl + finalUrl).then((response) => response.data);
};

export const GetOffers = (param) => {
  const apiRequest = "offer/?";
  const cityRequest = param.city == "" ? "" : `city=${param.city}&`;
  const stateRequest = param.state == 0 ? "" : `state=${param.state}&`;
  const jobRequest =
    param.selectedJob == "" ? "" : `job_id=${param.selectedJob}&`;
  const salaryRequest = param.salary == 0 ? "" : `salary=${param.salary}&`;

  return requestApi(
    `${apiRequest}${cityRequest}${stateRequest}${jobRequest}${salaryRequest}`
  );
};
