import React from "react";
import PropTypes from "prop-types";
import dataBoxAdmin from "../utils/dataBoxAdmin";
import "../styles/BoxAdmin.css";

const BoxAdmin = ({ handleContent }) => {
  const onClick = (e, link) => {
    e.preventDefault();
    handleContent(link);
  };

  return (
    <div className="dashboard_admin">
      {dataBoxAdmin.map((box) => (
        <div
          key={box.id}
          className="box_admin"
          onClick={(e) => onClick(e, box.link)}
          onKeyDown={(e) => onClick(e, box.link)}
          role="button"
          tabIndex={0}
        >
          <div key={box.id} className="box_admin_title">
            <h4>{box.title}</h4>
          </div>
          <div className="box_admin_body">
            <ul>
              {box.sections.map((section) => (
                <li>{section}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoxAdmin;

BoxAdmin.propTypes = {
  handleContent: PropTypes.func.isRequired,
};
