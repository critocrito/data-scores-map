// @flow
import * as React from "react";
import {Link} from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";

const Home = () => (
  <div>
    <Header />
    <article className="cf ph2-ns w-100 flex items-center bg-gradient">
      <div className="w-80-ns tc center ">
        <h2 className="f-subheadline-ns mt4 primary-color f2 pb3 bb b--accentuated-color bw2 ttu">
          Data Scores
        </h2>
        <h3 className="center pb4">Investigation Tool</h3>
        <p className=" near-black">
          <span className="b primary-color">
            Data scores that combine data from a variety of both online and
            offline activities are becoming a way to categorize citizens,
            allocating services, and predicting future behavior.
          </span>{" "}
          Yet little is still known about the implementation of data-driven
          systems and algorithmic processes in public services and how citizens
          are increasingly ‘scored’ based on the collection and combination of
          data.
        </p>
        <p className=" near-black ">
          As part of our project{" "}
          <a
            className="link primary-color"
            href="https://datajusticelab.org/data-scores-as-governance/"
          >
            ‘Data Scores as Governance’
          </a>{" "}
          we have developed a tool to map and investigate the uses of data
          analytics and algorithms in public services in the UK. This tool is
          designed to facilitate further research and investigation into this
          topic and to advance public knowledge and understanding.
        </p>

        <p className="near-black pb4 mb4">
          The tool is made up of a collection of documents from different
          sources that can be searched and mapped according to different
          categories. The database consists of more than 5300{" "}
          <span className="b"> unverified documents</span> that have been
          scraped based on a number of search terms relating to data systems in
          government. This is an incomplete and on-going data-set. You can read
          more in our{" "}
          <Link className="link primary-color" to="/methodology">
            Methodology section
          </Link>
          .
        </p>
      </div>
    </article>
    <section className="flex flex-column items-center">
      <h3 className="mt5 pb3 bb b--accentuated-color bw2 ttu">
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

    <section className="flex flex-column items-center">
      <h3 className="mt5 pb3 bb b--accentuated-color bw2 ttu">About</h3>
      <p className="w-60-ns tc f5 flex flex-wrap">
        This project is carried out by the Data Justice Lab. The Data Justice
        Lab examines the intricate relationship between datafication and social
        justice, highlighting the politics and impacts of data-driven processes
        and big data. The lab is hosted at Cardiff University’s School of
        Journalism, Media and Culture. Read more here:{" "}
        <Link
          className="tc center link primary-color"
          to="https://datajusticelab.org/"
        >
          datajusticelab.org{" "}
        </Link>
        .
      </p>
      <p className="w-60-ns tc center f5 flex flex-wrap pb5">
        Team: Lina Dencik, Arne Hintz, Joanna Redden, Harry Warne, Christo
        Buschek, Olivia Solis
      </p>
    </section>
    <Footer />
  </div>
);

export default Home;
