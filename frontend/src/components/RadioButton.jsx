import React from "react";
import PropTypes from "prop-types";
import "../styles/RadioButton.css";

const RadioButton = (props) => {
  const { labelName, inputName, inputValue, checked, onChange } = props;

  return (
    <div className="radio-button-container">
      <label htmlFor={inputName} className="radio-button-label">
        {labelName}{" "}
      </label>
      <input
        type="radio"
        name={inputName}
        id={inputName}
        value={inputValue}
        defaultChecked={checked}
        onChange={onChange}
      />
      <span className="checkmark" />
    </div>
  );
};

export default RadioButton;

RadioButton.propTypes = {
  labelName: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
