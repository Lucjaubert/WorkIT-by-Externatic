import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { authContext } from "../context/AuthContext";
import BG from "../assets/img/workit02-fond.png";

const Background = ({ user }) => {
  const { auth } = useContext(authContext);
  return ReactDOM.createPortal(
    <div
      className={
        (auth.data && auth.data.role_id === 2) || user === "consultant"
          ? "site_background"
          : "site_background_normal"
      }
    >
      <img src={BG} alt="background" />
    </div>,
    document.getElementById("root")
  );
};

export default Background;
