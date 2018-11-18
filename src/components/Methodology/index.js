// @flow
import * as React from "react";

import Header from "../Header";
import Footer from "../Footer";

const Methodology = () => (
  <div>
    <Header />
    <article className="cf ph2-ns flex items-center bg-gradient">
      <div className="w-100 w-100-m w-50-ns pa4 ml5-ns">
        <h2 className="f-subheadline-ns f2 lh-solid primary-color ttu bw3 ">
          Methodology
        </h2>
        <p className="f4 i mid-gray" />
        <p className="f4 near-black">
          The Data Scores Investigation tool draws inspiration from{" "}
          <a className="link primary-color" href="http://algorithmtips.org/">
            Algorithm Tips
          </a>
          , a US-based project which lists newsworthy algorithms used by the US
          government. As with this project, we sought to create something that
          could be used by journalists, civil society, and citizens to learn
          about data systems being used by government authorities in their area
          and which could facilitate further research.
        </p>
      </div>
      <div className="w-50-ns dn dn-m dt-ns">
        <img className="w-40 pl7 pb2" alt="" src="/images/case-studies.png" />
      </div>
    </article>
    <div className="vh-100 pa3 ma3 w-80-ns db relative center">
      <div className="w-80">
        <p>
          Drawing from the Algorithm Tips’{" "}
          <a
            className="link primary-color"
            href="http://algorithmtips.org/methodology/"
          >
            methodology
          </a>
          , we used search engines to scrape UK government websites - those
          ending in “gov.uk”, “nhs.uk”, “police.uk”, “mod.uk” and “sch.uk” - for
          information and documents relating to data systems. We adapted the
          keywords used by Algorithm Tips as keywords in the search, adding our
          own terms that we thought may be more likely to return productive
          results in a UK context. We also included the names of software and
          companies encountered during initial desk research. The final list of
          keywords includes 79 search terms and 45 names of organisations and
          systems. A different and shorter list of keywords using more generic
          terminology was used to add scrapes from newspaper websites, limited
          to the largest national and local newspapers, to the database.
          Finally, we added data from a list of over 100 Freedom of Information
          requests that we had sent out.
        </p>

        <p>
          The results of these searches and data-sets have been used to populate
          a database. This database includes all unverified data from those
          searches. For the Data Insights section, keyword matches have been
          paired with names of local authorities and council, organisations, and
          mentions of government departments categorised according to the
          government’s own typology, in order to provide visualisations of the
          data.
        </p>

        <p>
          Finally, the tool includes summaries of 6 case studies that were
          researched for the project, selected for geographical and topical
          spread, supplementing desk research with interviews for an in-depth
          qualitative analysis of developments.
        </p>

        <p>
          Follow this link for a code repository which contains the resources
          required to replicate this research:{" "}
          <a
            className="link primary-color"
            href="https://github.com/critocrito/data-scores-in-the-uk"
          >
            https://github.com/critocrito/data-scores-in-the-uk
          </a>
          .
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

export default Methodology;
