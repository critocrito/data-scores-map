// @flow
import * as React from "react";

import "./index.css";
import Header from "../Header";
import Footer from "../Footer";

const CaseStudies = () => (
  <div>
    <Header />
    <article className="cf ph2-ns flex items-center bg-gradient">
      <div className="w-100 w-100-m w-50-ns pa4 ml5-ns">
        <h2 className="f-subheadline-ns f2 lh-solid primary-color ttu bl b--accentuated-color bw3 pl2">
          Case Studies
        </h2>
        <p className="f4 i mid-gray">Research</p>
        <p className="f4 near-black">
          Read about some examples of how data-driven systems are implemented
          for public services in different local authorities in the UK.
        </p>
      </div>
      <div className="w-50-ns dn dn-m dt-ns">
        <img className="w-50 pl7" alt="" src="/images/case-studies.png" />
      </div>
    </article>
    <div className="vh">
    <div className="w-80-ns mv4 pa2 ba b--light-silver shadow-4 center">
      <h2 className="pa3 f3 primary-color">
        Integrated Analytical Hub – Bristol
      </h2>
      <p className="pa3">
        The Integrated Analytical Hub created internally by Bristol City Council
        started its development in 2016 in the context of the Troubled Families
        programme that launched in 2011. The Hub was initially built as a ‘data
        warehouse’ around the Troubled Families programme to provide Government
        with auditing data and to link data on people living in Bristol City
        that meet the programme’s criteria. This data includes 30 different
        social issue datasets, including crime records, unemployment, school
        attendance, and mental health provision. In its current phase, the data
        warehouse is also being used for analytics and risk profiling, or what
        is described by the Council as ‘targeted interventions’ and ‘targeted
        risk assessments’, currently focused on child exploitation. Profiling
        confirmed victims in recent years produce a statistics-based risk
        assessment. This includes a score between 0 and 100 for every young
        person in the database that is provided to the relevant case worker.
      </p>
    </div></div>
    <Footer />
  </div>
);

export default CaseStudies;
