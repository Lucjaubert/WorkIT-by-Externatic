import { useContext } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { authContext } from "./context/AuthContext";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";
import CreateProfile from "./pages/CreateProfile";
import Connexion from "./pages/Connexion";
import DashboardCandidate from "./pages/DashboardCandidate";
import DashboardConsultant from "./pages/DashboardConsultant";
import Error from "./pages/Error";
import LOGO from "./assets/img/logo.png";
import LOGOWHITE from "./assets/img/logo-white.png";
import ForgottenPassword from "./pages/ForgottenPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRouteUser from "./context/ProtectedRouteUser";
import ProtectedRouteConsultant from "./context/ProtectedRouteConsultant";
import ProtectedRouteAdmin from "./context/ProtectedRouteAdmin";
import "@progress/kendo-theme-default/dist/all.css";
import DashboardAdmin from "./pages/DashboardAdmin";
import FirmForm from "./components/FirmForm";
import Background from "./components/Background";

import "./styles/Flex.css";
import FicheCandidat from "./components/FicheCandidat";

import "./App.css";

const App = () => {
  const location = useLocation();
  const { auth } = useContext(authContext);

  return (
    <div id="app">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pat}>
          <Route path="/" element={<Home />} />
          <Route
            path="/ConnexionCandidat"
            element={<Connexion user="user" />}
          />
          <Route
            path="/ConnexionConsultant"
            element={<Connexion user="consultant" />}
          />
          <Route path="/ConnexionAdmin" element={<Connexion user="admin" />} />
          <Route path="/Main" element={<MainPage />} />
          <Route
            path="/DashboardCandidate"
            element={
              <ProtectedRouteUser>
                <DashboardCandidate />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/DashboardConsultant"
            element={
              <ProtectedRouteConsultant>
                <DashboardConsultant />
              </ProtectedRouteConsultant>
            }
          />
          <Route
            path="/DashboardAdmin"
            element={
              <ProtectedRouteAdmin>
                <DashboardAdmin />
              </ProtectedRouteAdmin>
            }
          />
          <Route path="/CreateProfile" element={<CreateProfile />} />
          <Route path="/ForgottenPassword" element={<ForgottenPassword />} />
          <Route path="/ResetPassword/:token/:id" element={<ResetPassword />} />
          <Route path="/FicheCandidat" element={<FicheCandidat />} />
          <Route path="/FicheEntreprise/:id" element={<FirmForm />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </AnimatePresence>
      <Background />
      <Link to="/Main">
        {auth.data && auth.data.role_id === 2 ? (
          <img className="logo_workit" src={LOGOWHITE} alt="logo" />
        ) : (
          <img className="logo_workit" src={LOGO} alt="logo" />
        )}
      </Link>
    </div>
  );
};

export default App;
