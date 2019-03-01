// @flow
import * as React from "react";
import {Link, withRouter} from "react-router-dom";
import type {Location} from "react-router-dom";

import "./index.css";

type Props = {
  location: Location,
};

const Header = ({location}: Props) => {
  const activeClass = "bb nav-link-active";
  const isDocumentsLocation = /^\/documents/.test(location.pathname);
  const isInsightsLocation = /^\/insights/.test(location.pathname);
  const isCaseStudiesLocation = /^\/case-studies/.test(location.pathname);
  const isOverviewsLocation = /^\/overviews/.test(location.pathname);
  const isMethodologyLocation = /^\/methodology/.test(location.pathname);

  return (
    <header className="cf ttu f6 ph2-ns flex-ns justify-between items-center">
      <h1 className="f3 w-100 w-40-ns pa2">
        <Link className="link ma2 ttu white primary-color" to="/">
          <div className="logo">
            <img
              alt="Data Scores in the UK"
              className="ml5-ns pa3-ns"
              src="/images/Ico@2x.png"
            />
          </div>
        </Link>
      </h1>
      <nav className="w-100 w-60-ns pa2-ns right">
        <ul className="list">
          <li className="ma2-ns ma1 dib">
            <Link
              to="/insights"
              className={`link nowrap ma2 pb1 b black ${
                isInsightsLocation ? activeClass : "hover-nav-link"
              }`}
            >
              Insights
            </Link>
          </li>
          <li className="ma2-ns ma1 dib">
            <Link
              to="/documents"
              className={`link nowrap ma2 pb1 b black ${
                isDocumentsLocation ? activeClass : "hover-nav-link"
              }`}
            >
              Documents Index
            </Link>
          </li>
          <li className="ma2-ns ma1 dib">
            <Link
              to="/case-studies"
              className={`link nowrap ma2 pb1 b black ${
                isCaseStudiesLocation ? activeClass : "hover-nav-link"
              }`}
            >
              Case Studies
            </Link>
          </li>
          <li className="ma2-ns ma1 dib">
            <Link
              to="/overviews"
              className={`link nowrap ma2 pb1 b black ${
                isOverviewsLocation ? activeClass : "hover-nav-link"
              }`}
            >
              Overviews
            </Link>
          </li>
          <li className="ma2-ns ma1 dib">
            <Link
              to="/methodology"
              className={`link nowrap ma2 pb1 b black ${
                isMethodologyLocation ? activeClass : "hover-nav-link"
              }`}
            >
              Methodology
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(Header);
