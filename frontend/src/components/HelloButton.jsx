import React, { useContext } from "react";
import { authContext } from "../context/AuthContext";
import logoutButton from "../assets/img/deconnexion.png";
import "../styles/HelloButton.css";

const HelloButton = () => {
  const { auth, logout } = useContext(authContext);

  return (
    <div className="hello_button">
      <h1>
        Bonjour {auth.data.firstname} {auth.data.lastname}
      </h1>
      <img
        src={logoutButton}
        alt="logout"
        onClick={logout}
        onKeyDown=""
        role="presentation"
        className="logout_logo"
        description="deconnexion"
      />
    </div>
  );
};

export default HelloButton;
