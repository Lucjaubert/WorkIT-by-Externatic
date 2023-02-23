import React from "react";
import PropTypes from "prop-types";
import "../styles/ConsultantsFilter.css";

import dataCandidatureFilter from "../utils/dataCandidatureFilter";
import RadioButton from "./RadioButton";
import "../styles/CandidatureFilter.css";

const CandidatureFilter = ({ onFilterChange, candidatureFilter }) => {
  return (
    <div className="candidature-filter">
      <div className="title-box">
        <h2 className="title">Candidatures</h2>
      </div>
      <div className="filter-body">
        {dataCandidatureFilter.map((filter) => (
          <RadioButton
            key={filter.id}
            inputName="state_id"
            inputValue={filter.stateId}
            labelName={filter.name}
            onChange={onFilterChange}
            checked={candidatureFilter.state_id === filter.stateId}
          />
        ))}
      </div>
    </div>
  );
};

export default CandidatureFilter;

CandidatureFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  candidatureFilter: PropTypes.element.isRequired,
};
