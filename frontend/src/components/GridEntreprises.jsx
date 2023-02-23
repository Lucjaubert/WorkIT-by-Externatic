import React from "react";
import {
  IntlProvider,
  LocalizationProvider,
  loadMessages,
} from "@progress/kendo-react-intl";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import frMessages from "../utils/fr.json";

loadMessages(frMessages, "fr-FR");

const initialDataState = {
  skip: 0,
  take: 10,
};

const GridEntreprises = ({ filteredFirms }) => {
  const [page, setPage] = React.useState(initialDataState);

  const pageChange = (event) => {
    setPage(event.page);
  };

  return (
    <div className="dashboard_enterprises">
      <LocalizationProvider language="fr-FR">
        <IntlProvider locale="fr">
          <Grid
            className="grid_enterprise"
            data={filteredFirms.slice(page.skip, page.take + page.skip)}
            skip={page.skip}
            take={page.take}
            total={filteredFirms.length}
            pageable
            onPageChange={pageChange}
          >
            <GridColumn title="Id" field="firm_id" width="50vw" />
            <GridColumn
              title="Nom de l'entreprise"
              field="name"
              width="240vw"
            />
            <GridColumn title="Téléphone" field="contact_phone" width="150vw" />
            <GridColumn title="Email" field="email" width="230vw" />
            <GridColumn title="Ville" field="city" width="180vw" />
            <GridColumn
              title="Nombre d'annonces"
              field="nbreoffers"
              width="150vw"
            />
            <GridColumn
              title="Actions"
              width="220vw"
              cell={(props) => (
                <td>
                  <Link to={`/FicheEntreprise/${props.dataItem.firm_id}`}>
                    Voir la fiche
                  </Link>
                </td>
              )}
            />
          </Grid>
        </IntlProvider>
      </LocalizationProvider>
    </div>
  );
};

GridEntreprises.propTypes = {
  filteredFirms: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataItem: PropTypes.shape({ firm_id: PropTypes.string }).isRequired,
};

export default GridEntreprises;
