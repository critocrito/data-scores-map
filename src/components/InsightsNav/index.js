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
        className={`w-100 w-third-ns ${isCategories ? "" : "pointer"}`}
        onClick={() => selectInsight("categories")}
        onKeyPress={() => selectInsight("categories")}
        role="button"
        tabIndex={0}
      >
        <div className="f3 h3 pa3 center ba b--silver">Categories</div>
        <div
          className={`bl h1 b--silver ${
            isCategories ? "bg-primary-color" : "bg-light-silver"
          }`}
        />
      </div>
      <div
        className={`w-100 w-third-ns ${isCompaniesSystems ? "" : "pointer"}`}
        onClick={() => selectInsight("companies-systems")}
        onKeyPress={() => selectInsight("companies-systems")}
        role="button"
        tabIndex={0}
      >
        <div className="f3 h3 pa3 center ba b--light-silver">
          Companies & Systems
        </div>
        <div
          className={`bl h1 b--silver ${
            isCompaniesSystems ? "bg-primary-color" : "bg-light-silver"
          }`}
        />
      </div>
      <div
        className={`w-100 w-third-ns ${isAuthorities ? "" : "pointer"}`}
        onClick={() => selectInsight("authorities")}
        onKeyPress={() => selectInsight("authorities")}
        role="button"
        tabIndex={0}
      >
        <div className="f3 h3 pa3 center ba b--light-silver">Locations</div>
        <div
          className={`bl h1 b--silver ${
            isAuthorities ? "bg-primary-color" : "bg-light-silver"
          }`}
        />
      </div>
    </div>
  );
};

export default InsightsNav;
