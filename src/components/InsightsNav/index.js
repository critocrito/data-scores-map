// @flow
import * as React from "react";
import {Link} from "react-router-dom";

type Props = {
  activeInsight: string,
};

const InsightsNav = ({activeInsight}: Props) => {
  const isCompaniesSystems = activeInsight === "companies-systems";
  const isAuthorities = activeInsight === "authorities";
  const isDepartments = activeInsight === "departments";

  return (
    <div className="cf ph6-ns flex-ns justify-around-ns mt4">
      <div className="w-100 w-third-ns mt4 mb4 tc flex flex-column justify-around">
        <Link
          to="/insights/companies-systems"
          className={`f4 mb2 b primary-color no-underline  center bb bw2 b--white ${
            isCompaniesSystems ? "bb bw2 b--accentuated-color" : "pointer"
          }`}
        >
          By: <span className="ttu">Organisations & Systems</span>
        </Link>
        <span className="w-50 i primary-color f7 tc center mt2">
          This provides an overview of how names of organisations and software
          systems appear in the database.
        </span>
      </div>

      <div className="w-100 w-third-ns mt4 mb4 tc flex flex-column justify-around">
        <Link
          to="/insights/authorities"
          className={`f4 mb2 b primary-color no-underline  center bb bw2 b--white ${
            isAuthorities ? "bb bw2 b--accentuated-color" : "pointer"
          }`}
        >
          By: <span className="ttu">Locations</span>
        </Link>
        <span className="w-50 i primary-color f7 tc center mt2">
          This provides a geolocation map over mentions of local authorities in
          the database.
        </span>
      </div>

      <div className="w-100 w-third-ns mt4 mb4 tc flex flex-column justify-around">
        <Link
          to="/insights/departments"
          className={`f4 mb2 b primary-color no-underline  center bb bw2 b--white ${
            isDepartments ? "bb bw2 b--accentuated-color" : "pointer"
          }`}
        >
          By: <span className="ttu">Departments</span>
        </Link>
        <span className="w-50 i primary-color f7 tc center mt2">
          This provides an overview of government departments mentioned in the
          database.
        </span>
      </div>
    </div>
  );
};

export default InsightsNav;
