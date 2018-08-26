// @flow
import * as React from "react";

type Props = {
  activeInsight: string,
  handler: (string) => void,
};

const InsightsNav = ({activeInsight, handler}: Props) => {
  const isCategories = activeInsight === "categories";
  const isCompaniesSystems = activeInsight === "companies-systems";
  const isAuthorities = activeInsight === "authorities";

  return (
    <div className="cf ph2-ns flex-ns justify-around-ns">
      <div
        className={`w-100 w-third-ns ${isCategories ? "" : "pointer"}`}
        onClick={() => handler("categories")}
        onKeyPress={() => handler("categories")}
        role="button"
        tabIndex={0}
      >
        <div className="f3 h3 pa3 center ba b--silver">Keywords</div>
        <div
          className={`bl h1 b--silver ${
            isCategories ? "bg-primary-color" : "bg-light-silver"
          }`}
        />
      </div>
      <div
        className={`w-100 w-third-ns ${isCompaniesSystems ? "" : "pointer"}`}
        onClick={() => handler("companies-systems")}
        onKeyPress={() => handler("companies-systems")}
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
        onClick={() => handler("authorities")}
        onKeyPress={() => handler("authorities")}
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
