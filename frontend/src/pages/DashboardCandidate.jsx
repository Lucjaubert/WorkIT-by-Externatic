import { React, useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import BoxCandidate from "../components/BoxCandidate";
import Footer from "../components/Footer";
import Dashboard from "../components/Dashboard";
import DashboardApplications from "../components/DashboardApplications";
import MyProfile from "../components/MyProfile";
import Chat from "../components/ChatCandidat";
import DashboardAlerts from "../components/DashboardAlerts";
import DashboardNewOffers from "../components/DashboardNewOffers";
import "../styles/DashboardCandidate.css";

const DashboardCandidate = () => {
  const [content, setContent] = useState("dashboard");

  const handleContent = (ctn) => {
    setContent(ctn);
  };

  const renderSwitch = () => {
    switch (content) {
      case "Mes informations personnelles":
        return <MyProfile />;
      case "Contacter mon conseiller":
        return <Chat />;
      case "Mes candidatures":
        return <DashboardApplications />;
      case "Gérer mes alertes":
        return <DashboardAlerts />;
      case "Mes nouvelles offres":
        return <DashboardNewOffers />;
      case "Mes coups de coeur":
        return <Dashboard />;
      default:
        return <DashboardNewOffers />;
    }
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavBar />
      <div className="mydashboard_candidate">
        <BoxCandidate handleContent={handleContent} />
        {renderSwitch()}
      </div>
      <div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default DashboardCandidate;
