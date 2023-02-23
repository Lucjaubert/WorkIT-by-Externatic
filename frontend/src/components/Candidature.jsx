import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import {
  IntlProvider,
  LocalizationProvider,
  loadMessages,
} from "@progress/kendo-react-intl";
import frMessages from "../utils/fr.json";
import {
  GetCandidated,
  PutCandidated,
} from "../utils/getSpontaneousApplications";
import "../styles/GridContainer.css";
import "../styles/KendoGrid.css";
import "../styles/Candidature.css";
import CandidatureFilter from "./CandidatureFilter";

loadMessages(frMessages, "fr-FR");

const initialDataState = {
  skip: 0,
  take: 10,
};

const Candidature = () => {
  const [page, setPage] = React.useState(initialDataState);
  const [candidatures, setCandidatures] = useState([]);
  const [candidaturesToShow, setCandidaturesToShow] = useState(candidatures);
  const [candidatureFilter, setCandidatureFilter] = useState({
    state_id: 0,
  });
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [idCandidature, setIdCandidature] = useState(null);

  const openActionCandidatureModal = (id) => {
    setIdCandidature(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIdCandidature(null);
  };

  const handleStateClick = (id, estEnCoursDeTraitement) => {
    if (estEnCoursDeTraitement) {
      openActionCandidatureModal(id);
    }
  };

  const cellNomPrenom = (item) => {
    return (
      <td>
        <span>
          {item.dataItem.lastname} {item.dataItem.firstname}
        </span>
      </td>
    );
  };

  const cellEtat = (item) => {
    let className = "";
    let estEnCoursDeTraitement = false;

    switch (item.dataItem.name) {
      case "En cours de traitement":
        estEnCoursDeTraitement = true;
        className = "orange";
        break;
      case "Refusée":
        className = "red";
        break;
      case "Acceptée":
        className = "green";
        break;
      default:
        break;
    }

    return (
      <td
        onClick={() =>
          handleStateClick(item.dataItem.candidated_id, estEnCoursDeTraitement)
        }
        className={estEnCoursDeTraitement ? "cursor" : ""}
        onKeyDown={(e) => e.preventDefault()}
        role="presentation"
      >
        <span className={className}>{item.dataItem.name}</span>
      </td>
    );
  };

  const pageChange = (event) => {
    setPage(event.page);
  };

  const filter = (candidaturesList, stateId) => {
    if (stateId === 0) {
      setCandidaturesToShow(candidaturesList);
    } else {
      setCandidaturesToShow(
        candidaturesList.filter((candidature) => {
          return candidature.state_id === stateId;
        })
      );
    }
  };

  const onFilterChange = (e) => {
    const { name, value } = e.target;
    setCandidatureFilter({
      ...candidatureFilter,
      [name]: Number(value),
    });

    filter(candidatures, Number(value));
  };

  const getCandidatures = async () => {
    const candidated = await GetCandidated();
    setCandidatures(candidated);
    filter(candidated, candidatureFilter.state_id);
  };

  const handleActionCandidature = (action) => {
    if (action === "accept") {
      PutCandidated(idCandidature, { application_state_id: 3 });
    } else {
      PutCandidated(idCandidature, { application_state_id: 2 });
    }

    getCandidatures();
    closeModal();
  };

  useEffect(() => {
    getCandidatures();
  }, []);

  return (
    <div className="candidature container-body">
      <div className="container">
        <div className="filter-box">
          <CandidatureFilter
            onFilterChange={onFilterChange}
            candidatureFilter={candidatureFilter}
          />
        </div>
        <div className="grid-container-box">
          <div className="grid-container-box-title">
            <h2>Nouvelles candidatures spontanées</h2>
          </div>
          <div className="grid-container">
            <button
              type="submit"
              className="btn-container"
              onClick={getCandidatures}
            >
              Actualiser
            </button>
            <LocalizationProvider language="fr-FR">
              <IntlProvider locale="fr">
                <Grid
                  className="grid"
                  data={candidaturesToShow.slice(
                    page.skip,
                    page.take + page.skip
                  )}
                  skip={page.skip}
                  take={page.take}
                  total={candidaturesToShow.length}
                  pageable
                  onPageChange={pageChange}
                >
                  <GridColumn
                    title="Nom Prénom"
                    width="180px"
                    cell={cellNomPrenom}
                    onClick={getCandidatures}
                  />
                  <GridColumn field="user_id" title="Id candidat" />
                  <GridColumn
                    field="title"
                    title="Intitulé du poste"
                    width="200px"
                  />
                  <GridColumn
                    field="offer_id"
                    title="Id de l'offre"
                    width="200px"
                  />
                  <GridColumn
                    field="name"
                    title="Etat de la candidature"
                    width="200px"
                    cell={cellEtat}
                  />
                </Grid>
              </IntlProvider>
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="candidature-modal"
        overlayClassName="candidature-overlay"
      >
        <div className="title">Veuillez saisir votre choix</div>
        <div className="content">
          <button
            type="button"
            className="button"
            onClick={() => handleActionCandidature("accept")}
          >
            Accepter la candidature
          </button>
          <button
            type="button"
            className="button"
            onClick={() => handleActionCandidature("refuse")}
          >
            Refuser la candidature
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Candidature;
