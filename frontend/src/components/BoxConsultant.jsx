import React from "react";
import PropTypes from "prop-types";
import dataBoxConsultant from "../utils/dataBoxConsultants";
import "../styles/BoxConsultant.css";

const BoxConsultant = ({ handleContent }) => {
  const onClick = (e, link) => {
    e.preventDefault();
    handleContent(link);
  };

  return (
    <div className="dashboard_consultant">
      {dataBoxConsultant.map((box) => (
        <div
          key={box.id}
          className="box_consultant"
          onClick={(e) => onClick(e, box.link)}
          onKeyDown={(e) => onClick(e, box.link)}
          role="button"
          tabIndex={0}
        >
          <div key={box.id} className="box_consultant_title">
            <h4>{box.title}</h4>
          </div>
          <div className="box_consultant_body">
            <ul>
              {box.sections.map((section) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                <li
                  className="box-consultant-li "
                  onClick={(e) => onClick(e, section)}
                >
                  {section}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoxConsultant;

BoxConsultant.propTypes = {
  handleContent: PropTypes.func.isRequired,
};
