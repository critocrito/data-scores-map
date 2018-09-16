// @flow
import * as React from "react";

type Props = {
  activeInsight: string,
  selectInsight: (string) => void,
};

const InsightsNav = ({activeInsight, selectInsight}: Props) => {
  const isCategories = activeInsight === "categories";
  const isCompaniesSystems = activeInsight === "companies-systems";
  const isAuthorities = activeInsight === "authorities";

  return (
    <div className="cf ph2-ns flex-ns justify-around-ns">
      <div
        className={`w-100 w-third-ns f4 mt4 mb4 pa3 tc b primary-color ${
          isCategories ? "" : "pointer"
        }`}
        onClick={() => selectInsight("categories")}
        onKeyPress={() => selectInsight("categories")}
        role="button"
        tabIndex={0}
      >
        By: <span className="ttu">Categories</span>{" "}
      </div>

      <div
        className={`w-100 w-third-ns f4 mt4 mb4 pa3 tc b primary-color ${
          isCompaniesSystems ? "" : "pointer"
        }`}
        onClick={() => selectInsight("companies-systems")}
        onKeyPress={() => selectInsight("companies-systems")}
        role="button"
        tabIndex={0}
      >
        By: <span className="ttu">Companies & Systems</span>{" "}
      </div>

      <div
        className={`w-100 w-third-ns f4 mt4 mb4 pa3 tc b primary-color ttu ${
          isAuthorities ? "" : "pointer"
        }`}
        onClick={() => selectInsight("authorities")}
        onKeyPress={() => selectInsight("authorities")}
        role="button"
        tabIndex={0}
      >
        By: <span className="ttu">Locations</span>{" "}
      </div>
    </div>
  );
};

export default InsightsNav;
