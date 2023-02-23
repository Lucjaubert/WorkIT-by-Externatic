import React from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import {
  IntlProvider,
  LocalizationProvider,
  loadMessages,
} from "@progress/kendo-react-intl";
import frMessages from "../utils/fr.json";
import "../styles/GridContainer.css";
import "../styles/KendoGrid.css";

loadMessages(frMessages, "fr-FR");

const initialDataState = {
  skip: 0,
  take: 10,
};

const exempleDataGrid = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
  {
    id: 3,
    name: "Jeanne Doe",
  },
];

const MessagerieConsultant = () => {
  const [page, setPage] = React.useState(initialDataState);

  const pageChange = (event) => {
    setPage(event.page);
  };

  return (
    <div className="container-body">
      <div className="container">
        <div className="grid-container-box">
          <div className="grid-container-box-title">
            <h2>Messagerie</h2>
          </div>
          <div className="grid-container">
            <button type="submit" className="btn-container">
              Actualiser
            </button>
            <LocalizationProvider language="fr-FR">
              <IntlProvider locale="fr">
                <Grid
                  className="grid"
                  data={exempleDataGrid.slice(page.skip, page.take + page.skip)}
                  skip={page.skip}
                  take={page.take}
                  total={exempleDataGrid.length}
                  pageable
                  onPageChange={pageChange}
                >
                  <GridColumn field="id" title="Id" />
                  <GridColumn field="name" title="Nom" />
                </Grid>
              </IntlProvider>
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagerieConsultant;
