import React from "react";
import { motion } from "framer-motion";
import Inscription from "../components/Inscription";
import BannierePartenaire from "../components/BannierePartenaire";
import "../styles/CreateProfile.css";

const CreateProfile = () => {
  return (
    <motion.div
      className="page_createprofile"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Inscription />
      <BannierePartenaire />
    </motion.div>
  );
};

export default CreateProfile;
