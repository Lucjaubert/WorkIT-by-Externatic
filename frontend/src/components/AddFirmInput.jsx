import PropTypes from "prop-types";
import React from "react";
import "../styles/AddFirmInput.css";

const AddFirmInput = ({
  id,
  label,
  type,
  name,
  placeholder,
  value,
  className,
  addNewFirm,
  setAddNewFirm,
}) => {
  const handleChange = (e) => {
    setAddNewFirm({
      ...addNewFirm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div key={id} className={`input-container ${className}`}>
      <label htmlFor={name}> {label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className="input"
        onChange={handleChange}
      />
    </div>
  );
};

AddFirmInput.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  addNewFirm: PropTypes.func.isRequired,
  setAddNewFirm: PropTypes.func.isRequired,
};

AddFirmInput.defaultProps = {
  className: "",
};

export default AddFirmInput;
