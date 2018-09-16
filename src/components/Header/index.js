// @flow
import * as React from "react";
import {Link, withRouter} from "react-router-dom";
import type {Location} from "react-router-dom";

import "./index.css";

type Props = {
  location: Location,
};

const Header = ({location}: Props) => {
  const activeClass = "bb bw3 b--primary-color";
  const isDocumentsLocation = /^\/documents/.test(location.pathname);

  return (
    <header className="cf ph2-ns flex-ns items-center">
      <h1 className="f3 w-100 w-60-ns pa2">
        <Link className="link pa2 ttu white primary-color" to="/">
          Data Scores in the UK
        </Link>
      </h1>
      <nav className="w-100 w-40-ns pa2">
        <ul className="list">
          <li className="pa2 dib">
            <Link
              to="/documents"
              className={`link nowrap pa2 black ${
                isDocumentsLocation ? activeClass : "hover-nav-link"
              }`}
            >
              Documents Index
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(Header);
