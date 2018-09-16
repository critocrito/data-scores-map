// @flow
import * as React from "react";
import {Link} from "react-router-dom";

type Props = {
  activeInsight: string,
};

const InsightsNav = ({activeInsight}: Props) => {
  const isCategories = activeInsight === "categories";
  const isCompaniesSystems = activeInsight === "companies-systems";
  const isAuthorities = activeInsight === "authorities";

  return (
    <div className="cf ph2-ns flex-ns justify-around-ns">
      <div className="w-100 w-third-ns mt4 mb4 tc">
        <Link
          to="/insights/categories"
          className={`f4 pa3 b primary-color no-underline ${
            isCategories ? "bb bw2 b--accentuated-color" : "pointer"
          }`}
        >
          By: <span className="ttu">Categories</span>
        </Link>
      </div>

      <div className="w-100 w-third-ns mt4 mb4 tc">
        <Link
          to="/insights/companies-systems"
          className={`f4 pa3 b primary-color no-underline ${
            isCompaniesSystems ? "bb bw2 b--accentuated-color" : "pointer"
          }`}
        >
          By: <span className="ttu">Companies & Systems</span>
        </Link>
      </div>

      <div className="w-100 w-third-ns mt4 mb4 tc">
        <Link
          to="/insights/authorities"
          className={`f4 pa3 b primary-color ttu no-underline ${
            isAuthorities ? "bb bw2 b--accentuated-color" : "pointer"
          }`}
        >
          By: <span className="ttu">Locations</span>
        </Link>
      </div>
    </div>
  );
};

export default InsightsNav;
