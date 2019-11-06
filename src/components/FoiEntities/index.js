// @flow
import * as React from "react";
import {withRouter} from "react-router-dom";
import type {Match, History} from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import FoiEntitiesDetails from "../FoiEntitiesDetails";
import Context from "../../lib/context";

type Props = {
  match: Match,
  history: History,
};

const foiRequests = [
  "03-04-2018-manchester-city-council-response-ascawzc3p-pdf",
  "04-09-manchester-city-council-ibase-software-license-support-renewal-2018-19-redacted-pdf",
  "04-09-manchester-city-council-treawzbqx-internal-review-aug-2018-pdf",
  "09-03-2018-kent-cc-1st-foi-response-response-all-information-to-be-supplied-pdf",
  "09-05-2018-london-borough-of-southwark-response-data-justice-lab-922940-pdf",
  "13-04-2018-response-foi-foi10862-pdf",
  "16-07-2018-london-borough-of-southwark-943388-pdf",
  "31-07-greater-manchester-combined-authority-response-docx",
  "a-guide-to-admission-risk-cpm-pdf",
  "connect-measure-2018-04-06-16079-reply-data-docx",
  "connect-measure-2018-04-06-16079-response-doc",
  "connect-measure-2-2018-04-06-16078-response-doc",
  "copy-of-01-05-2018-bristol-city-council-respnse-to-crn00166467-docx",
  "copy-of-08-03-2018-kent-county-council-2nd-response-docx",
  "copy-of-12-07-2018-bristol-city-council-response-to-crn00166467-docx",
  "copy-of-blaenau-gwent-county-borough-council-foi-response-email-29-05-2018-docx",
  "copy-of-durham-constabulary-general-foi-response-email-referred-us-to-earlier-foi-follow-up-email-sent-docx",
  "copy-of-hackney-foi18-0501-13317-response-07-09-2018-docx",
  "cse-case-study-final-pdf",
  "data-justice-lab-request-response-foi-422-18-response-docx",
  "data-process-maps-pdf",
  "durham-county-council-foi-response-01-05-2018-pdf",
  "essex-county-council-foi-response-18-05-2018-ecc4537301-05-18-s12-cost-exemption-18052018-docx",
  "foi-reference-chsawzbqx-april-2018-pdf",
  "general-request-2018-06-13-16274-response-doc",
  "gwent-police-general-request-2018-20985-email-docx",
  "hart-response-to-someone-else-they-sent-us-foi-59-18-response-1-docx",
  "ibase-overview-2018-pdf",
  "intellishare-handbook-training-v06-pdf",
  "intellishare-training-sept-nov-17-pptx",
  "nhs-manchester-ccg-foi-internal-review-request-11917-docx",
  "nhs-manchester-ccg-foi-report-11917-doc",
  "qlikview-foi-completed-docx",
  "script-for-custody-officers-pdf",
  "someone-else-s-request-response-foi-295-18-response-docx",
  "someone-else-s-request-response-foi-59-18-response-docx",
  "someone-else-s-request-response-foi-801-17-response-docx",
  "tf-evaluation-final-council-pdf",
  "think-family-database-risk-log-pdf",
  "untitled-presentation-pdf",
];

class FoiEntities extends React.Component<Props> {
  setFoiRequest = (newFoiRequest) => {
    const {history} = this.props;
    history.push({pathname: `/foi-requests/${newFoiRequest}`});
    window.location.reload();
  };

  render() {
    const {match} = this.props;
    const {foiRequest} = match.params;

    if (foiRequest == null) return "";

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
              Entities extracted from the FOI requests, matched against entities
              in the documents index.
            </p>
          </div>
          <div className="w-50-ns dn dn-m dt-ns">
            <img className="w-40 pl7 pb2" alt="" src="/images/insight.png" />
          </div>
        </article>
        <article className="cf ph2-ns flex items-center">
          <select onChange={(event) => this.setFoiRequest(event.target.value)}>
            {foiRequests.map((study) => (
              <option key={study} selected={study === foiRequest} value={study}>
                {study}
              </option>
            ))}
          </select>
        </article>
        <Context.Consumer>
          {({store}) => <FoiEntitiesDetails store={store} foi={foiRequest} />}
        </Context.Consumer>
        <Footer />
      </div>
    );
  }
}

export default withRouter(FoiEntities);
