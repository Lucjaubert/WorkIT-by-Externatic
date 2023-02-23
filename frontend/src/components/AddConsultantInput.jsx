import PropTypes from "prop-types";
import React from "react";

const AddConsultantInput = ({
  id,
  label,
  type,
  name,
  placeholder,
  value,
  className,
  addNewConsultant,
  setAddNewConsultant,
}) => {
  const handleChange = (e) => {
    setAddNewConsultant({
      ...addNewConsultant,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div key={id}>
      <label htmlFor={name}> {label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={className}
        onChange={handleChange}
      />
    </div>
  );
};

AddConsultantInput.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  addNewConsultant: PropTypes.func.isRequired,
  setAddNewConsultant: PropTypes.func.isRequired,
};

export default AddConsultantInput;
