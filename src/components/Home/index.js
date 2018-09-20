// @flow
import * as React from "react";
import {Link} from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";

const Home = () => (
  <div>
    <Header />
    <article className="cf ph2-ns w-100 flex items-center bg-gradient">
      <div className="w-80-ns center pa4 ml5-ns">
        <h2 className="f-subheadline-ns f2 lh-solid primary-color ttu pl2 bl b--accentuated-color bw3">
          Data Scores Investigation Tool
        </h2>
        <p className="f4 near-black">
          As part of our project{" "}
          <span className="primary-color">‘Data Scores as Governance’</span> we
          have developed a tool to map and investigate the uses of data
          analytics and algorithms in public services in the UK. Little is still
          known about the implementation of data-driven systems and algorithmic
          processes in public services and how citizens are increasingly
          ‘scored’ based on the collection and combination of data. This tool is
          designed to facilitate further research and investigation into this
          topic and to advance public knowledge and understanding.
        </p>

        <p className="f4 near-black">
          The tool is made up of a collection of documents from different
          sources that can be searched and mapped according to different
          categories. The database consists of almost 2000 unverified documents
          that have been scraped based on a number of search terms relating to
          data systems in government. This is an incomplete and on-going
          data-set. You can read more in our Methodology section.
        </p>
      </div>
    </article>
    <section className="flex flex-column items-center">
      <h3 className="mt4 pb3 bb b--accentuated-color bw2 ttu">
        How to use this tool
      </h3>
      <p className="f5 i b tc mid-gray">
        There are 3 main sections for exploring the data.
      </p>
      <ul className="w-80-ns list flex flex-wrap">
        <li className="w-100 w-third-ns tc pa4">
          <Link className="link black nounderline" to="/insights">
            <img
              alt="Insights Logo"
              src="/images/home-insights.png"
              className="w4 h4 center"
            />
            <h4 className="f3 mv1">Data Insights</h4>
            <p className="f5 i b mid-gray">Exploratory overview</p>
            <p className="f5">
              The data presented here is partial to the category selected, it
              gives a visual hint so it is easy to navigate.
            </p>
          </Link>
        </li>

        <li className="w-100 w-third-ns tc pa4">
          <Link className="link black nounderline" to="/documents">
            <img
              alt="Documents Index Logo"
              src="/images/home-documents-index.png"
              className="w4 h4 center"
            />
            <h4 className="f3 mv1">Document Index</h4>
            <p className="f5 i b mid-gray">Specific word or phrase</p>
            <p className="f5">
              Here you can search within the whole database. You can find search
              terms or phrases in context categories.
            </p>
          </Link>
        </li>

        <li className="w-100 w-third-ns tc pa4">
          <Link className="link black nounderline" to="/case-studies">
            <img
              alt="Case Studies Logo"
              src="/images/home-case-studies.png"
              className="w4 h4 center"
            />
            <h4 className="f3 mv1">Case studies</h4>
            <p className="f5 i b mid-gray">Research</p>
            <p className="f5">
              Here you can read about some examples of uses of data analytics in
              public services based on in-depth research.
            </p>
          </Link>
        </li>
      </ul>
    </section>
    <Footer />
  </div>
);

export default Home;
