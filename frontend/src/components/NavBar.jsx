import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import HelloButton from "./HelloButton";
import { authContext } from "../context/AuthContext";
import {
  navBarUser,
  navBarAdmin,
  navBarConsultants,
  navBarSignIn,
} from "../utils/navBarLinks";
import cloche from "../assets/img/notification-alert.png";
import "../styles/NavBar.css";

const NavBar = () => {
  const { auth, notification } = useContext(authContext);
  const [navBar, setNavBar] = useState([]);

  useEffect(() => {
    if (auth.data) {
      switch (auth.data.role_id) {
        case 2:
          return setNavBar(navBarConsultants);
        case 1:
          return setNavBar(navBarUser);
        case 3:
          return setNavBar(navBarAdmin);
        default:
          return setNavBar(navBarSignIn);
      }
    } else {
      return setNavBar(navBarSignIn);
    }
  }, [auth]);

  return (
    <div className="navbar">
      <ul>
        {navBar.map((section) => (
          <NavLink to={section.link} className="items" key={section.id}>
            {section.name}
          </NavLink>
        ))}
        {auth.data && auth.data.role_id === 1 ? (
          <NavLink to="/DashboardCandidate">
            <div className="notifications">
              <img src={cloche} alt="cloche" className="cloche_alerte" />
              {auth.data && <div className="number_alerte">{notification}</div>}
            </div>
          </NavLink>
        ) : null}
        {auth.data && <HelloButton />}
      </ul>
    </div>
  );
};

export default NavBar;
