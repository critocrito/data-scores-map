// @flow
import * as React from "react";
import {withRouter} from "react-router-dom";
import type {Match, History} from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import CaseStudiesEntitiesDetails from "../CaseStudiesEntitiesDetails";
import Context from "../../lib/context";

type Props = {
  match: Match,
  history: History,
};

const caseStudies = [
  "avon_and_somerset",
  "bristol",
  "camden",
  "hackney",
  "kent",
  "manchester",
  "mosaic",
];

class CaseStudiesEntities extends React.Component<Props> {
  setCaseStudy = (newCaseStudy) => {
    const {history} = this.props;
    history.push({pathname: `/case-studies/${newCaseStudy}`});
    window.location.reload();
  };

  render() {
    const {match} = this.props;
    const {caseStudy} = match.params;

    if (caseStudy == null) return "";

    return (
      <div>
        <Header />
        <article className="cf ph2-ns flex items-center bg-gradient">
          <div className="w-100 w-100-m w-50-ns pa4 ml5-ns">
            <h2 className="f-subheadline-ns f2 lh-solid primary-color ttu bw3 ">
              Case Studies Entities
            </h2>
            <p className="f4 i mid-gray">Exploratory overview</p>
            <p className="f4 near-black">
              Entities extracted from the case studies, matched against entities
              in the documents index.
            </p>
          </div>
          <div className="w-50-ns dn dn-m dt-ns">
            <img className="w-40 pl7 pb2" alt="" src="/images/insight.png" />
          </div>
        </article>
        <article className="cf ph2-ns flex items-center">
          <select onChange={(event) => this.setCaseStudy(event.target.value)}>
            {caseStudies.map((study) => (
              <option key={study} selected={study === caseStudy} value={study}>
                {study}
              </option>
            ))}
          </select>
        </article>
        <Context.Consumer>
          {({store}) => (
            <CaseStudiesEntitiesDetails store={store} caseStudy={caseStudy} />
          )}
        </Context.Consumer>
        <Footer />
      </div>
    );
  }
}

export default withRouter(CaseStudiesEntities);
