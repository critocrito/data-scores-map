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
        <h2 className="f-subheadline-ns f2 lh-solid primary-color ttu bw3 ">
          Case Studies
        </h2>
        <p className="f4 i mid-gray">Research</p>
        <p className="f4 near-black">
          Read about some examples of how data-driven systems are implemented
          for public services in different local authorities in the UK.
        </p>
      </div>
      <div className="w-50-ns dn dn-m dt-ns">
        <img className="w-40 pl7 pb2" alt="" src="/images/case-studies.png" />
      </div>
    </article>
    <div className="vh-100 pa3 ma3 w-100-ns db relative center">
      <div className="w-80 center ">
        <div className="fl w-30 tl ">
          <img
            alt="Bristol Integrated Analytical Hub"
            src="images/case_bristol.png"
          />
        </div>
        <div className="fl w-70 tl pb4">
          <h2 className="pa3 f3 primary-color">
            Bristol Integrated Analytical Hub
          </h2>
          <p className="pa3 f5">
            The Integrated Analytical Hub is an in-house developed system that
            was established out of Bristol City Council’s Think Family approach
            to the national Troubled Families programme ‘to encourage services
            to deal with families as a whole, rather than responding to each
            problem, or person, separately’. The Troubled Families programme was
            launched in 2011 to help families who struggle with factors such as
            unemployment, crime and poor school attendance. Think Family
            identified families facing issues, such as parents and children
            involved in crime or anti-social behaviour; children not attending
            school regularly; children who need help; adult out of work or at
            risk of financial exclusion and young people at risk of
            worklessness; families affected by domestic violence and abuse;
            parents and children with a range of health problems. Bristol’s
            Think Family programme is now in its second phase. As a result of
            the learning from the first phase, Bristol developed a Think Family
            Database that consolidated information from 35 different social
            issue datasets, about 54,000 families in the local authority area,
            to understand the strategic and operational needs of the city. The
            database is up and running and is now able to provide information to
            predict future need as well as simply responding to presenting
            issues.
          </p>
        </div>
      </div>

      <div className="w-80 center  ">
        <div className="fl w-30 tl ">
          <img
            alt="Bristol Integrated Analytical Hub"
            src="images/case_camdem.png"
          />
        </div>
        <div className="fl w-70 tl pb4">
          <h2 className="pa3 f3 primary-color">Camden Resident Index</h2>
          <p className="pa3 f5">
            The Camden Resident Index is a data management system utilising
            software supplied by IBM that allows for a ‘single view of a
            citizen’ by aggregating data from 16 different council business
            systems across Camden Council, covering 123 fields of primarily
            demographic information. It is to date the largest data management
            installation in local government in the UK. It was created in 2013
            following the closure of the national children’s database Contact
            Point to uphold multi-agency work. It uses probabilistic matching
            technology to match individuals or households across the different
            business systems, in which records are matched together to produce a
            comparison score that indicates the likelihood of records belonging
            to the same person or family. The Camden Resident Index is used by
            the Multi-Agency Safeguarding Hub to locate information about a
            household’s engagement with services across the Council. A key use
            of the index is to enable automated fraud detection, such as
            validation for residency for accessing council services such as
            school places, number of residents in a household for council tax
            discount, or cases of illegal subletting of council housing.
          </p>
        </div>
      </div>

      <div className="w-80 center  ">
        <div className="fl w-30 tc ">
          <img
            className="pr3 pt3 "
            alt="Bristol Integrated Analytical Hub"
            src="images/case_avon.png"
          />
        </div>
        <div className="fl w-70 tl pb4">
          <h2 className="pa3 f3 primary-color">
            Avon & Somerset Police Qlik Sense
          </h2>
          <p className="pa3">
            Qlik Sense was first piloted by Avon & Somerset Police in 2016 and
            now has over 30 applications across teams. It serves as both a
            performance assessment tool and a predictive policing tool.
            Developed in part as a response to on-going austerity measures, the
            system is a form of self-service analytics software that connects
            internal datasets within Avon & Somerset Police, as well as some
            datasets from other agencies in Bristol Council, to provide
            integrated assessments and evaluations. The focus here is the
            predictive modeling for individual offenders and victims as well as
            neighbourhood mapping of crime. Built into Qlik Sense applications
            are offender risk scores and vulnerability risk scores along with a
            harm rating that determines an overall risk. It is intended as a
            ‘one-click’ system that provides individual offending and
            intelligence profiles to help ‘triage’ risks and threats. The system
            is used by frontline staff to decide on allocation of resources and
            pathways of managing highest risk offenders. In some instances, such
            as domestic abuse, it is used to decide on who to manage and to
            enable pre-emptive measures.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default CaseStudies;
