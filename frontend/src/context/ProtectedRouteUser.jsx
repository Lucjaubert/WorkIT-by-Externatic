import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { authContext } from "./AuthContext";

const ProtectedRouteUser = ({ children }) => {
  const { auth } = useContext(authContext);

  if (auth.data.role_id !== 1) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRouteUser;

ProtectedRouteUser.propTypes = {
  children: PropTypes.element.isRequired,
};
