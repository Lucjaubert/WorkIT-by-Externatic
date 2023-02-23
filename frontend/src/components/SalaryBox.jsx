import React from "react";
import PropTypes from "prop-types";
import "../styles/SalaryBox.css";

const SalaryBox = ({ salary, setSalary }) => {
  return (
    <div className="salary_box">
      <div className="salary_titleblock">
        <h3 className="salary_title"> Salaire brut annuel</h3>
      </div>
      <div className="salary_body">
        <label htmlFor="salary"> </label>
        <input
          type="range"
          min="0"
          max="100000"
          value={salary}
          className="slider"
          onChange={(e) => setSalary(Number(e.target.value))}
        />{" "}
        <h3>
          {" "}
          <span className="minimal_salary">Salaire minimal: </span>
          <span className="amount_salary">{salary} € </span>
        </h3>
      </div>
    </div>
  );
};

export default SalaryBox;

SalaryBox.propTypes = {
  salary: PropTypes.number.isRequired,
  setSalary: PropTypes.func.isRequired,
};
