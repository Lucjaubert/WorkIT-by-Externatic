import { React, useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import BoxConsultant from "../components/BoxConsultant";
import ChatConsultant from "../components/ChatConsultant";
import Footer from "../components/Footer";
import Candidature from "../components/Candidature";
import EnterpriseConsultant from "../components/EnterpriseConsultant";
import Candidats from "../components/Candidats";
import "../styles/DashboardConsultants.css";

const DashboardConsultant = () => {
  const [content, setContent] = useState("annonces");

  const handleContent = (link) => {
    setContent(link);
  };

  const renderSwitch = () => {
    switch (content) {
      case "entreprises":
        return <EnterpriseConsultant />;
      case "candidats":
        return <Candidats />;
      case "candidatures":
        return <Candidature />;
      case "messagerie":
        return <ChatConsultant />;
      default:
        return <EnterpriseConsultant />;
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
      <div className="mydashboard_body">
        <BoxConsultant handleContent={handleContent} />
      </div>
      <div className="mydashboard_render">{renderSwitch()}</div>
      <div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default DashboardConsultant;
