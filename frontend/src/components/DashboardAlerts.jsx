import React from "react";
import JobAlert from "./JobAlert";

const DashboardAlerts = () => {
  return (
    <div>
      <div className="job_alerts_body">
        <div className="job_alerts">
          <div className="job_alerts_titleblock">
            <h2 className="job_alerts_title">Mes alertes</h2>
          </div>
          <div className="job_alerts_created">
            <div className="my_alerts_offers_body">
              <JobAlert />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAlerts;
