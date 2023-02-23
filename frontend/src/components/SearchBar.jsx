import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GetAllJobs } from "../apis/jobApi";
import { GetAllCities } from "../apis/offerApi";
import "../styles/SearchBar.css";
import search from "../assets/img/search.png";

const SearchBar = ({ setSelectedJob, setCity }) => {
  const [job, setJob] = useState([]);
  const [cities, setCities] = useState([]);

  const getCities = () => {
    GetAllCities().then((res) => {
      setCities(res.data);
    });
  };

  const loadJobs = () => {
    GetAllJobs().then((res) => {
      setJob(res.data);
    });
  };

  useEffect(() => {
    loadJobs();
    getCities();
  }, []);

  return (
    <div className="searchBar">
      <div className="inputBox2">
        <div className="inputBox">
          <label htmlFor="job_select">
            <select
              id="job_select"
              onChange={(e) => setSelectedJob(e.target.value)}
              autoComplete="on"
            >
              <option disabled selected value>
                Quoi ?{" "}
              </option>
              <option value="">Tous les postes</option>
              {job.map((work) => (
                <option value={work.id}> {work.job_title}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="inputBox">
          <label htmlFor="city_select">
            <select
              id="city_select"
              onChange={(e) => setCity(e.target.value)}
              autoComplete="on"
            >
              <option disabled selected value>
                {" "}
                Ou ?{" "}
              </option>
              <option value="">Toutes les villes</option>
              {cities.map((city) => (
                <option value={city.firm_city}>{city.firm_city} </option>
              ))}
            </select>
          </label>
        </div>
        <img src={search} alt="search" className="logo" />
      </div>
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  setSelectedJob: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
};
