// @flow
import * as React from "react";
import {withRouter} from "react-router-dom";
import type {Match} from "react-router-dom";

import "./index.css";
import Header from "../Header";
import {document as fetchDocument} from "../../lib/requests";
import {sourcify} from "../../lib/utils";
import type {FullDocument} from "../../lib/types";

type Props = {
  match: Match,
};

type State = {
  document: FullDocument | null,
};

class DocumentsDetails extends React.Component<Props, State> {
  state = {
    document: null,
  };

  _isMounted: boolean = false;

  async componentDidMount() {
    const {match} = this.props;
    const {documentId} = match.params;
    this._isMounted = true;

    if (documentId != null) {
      try {
        const {data} = await fetchDocument(documentId);
        if (data.length > 0) {
          const [doc] = data;
          if (this._isMounted === true) this.setState({document: doc});
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {document} = this.state;

    if (document == null)
      return (
        <div>
          <Header />
        </div>
      );

    return (
      <div>
        <Header />
        <div className="flex mt4">
          <dl className="w-100 w-two-thirds-ns pa2">
            <dt>
              <span className="bb bw2 b--primary-color">Document title:</span>
            </dt>
            <dd>
              <h1>{document.title}</h1>
            </dd>
            <dt>
              <span className="bb bw2 b--primary-color">Description:</span>
            </dt>
            <dd>
              <p>{document.description}</p>
            </dd>
            <dt>
              <span className="bb bw2 b--primary-color">Source:</span>
            </dt>
            <dd>
              <p className="flex flex-column">
                <span>{sourcify(document.source)}</span>
                <a className="link primary-color" href={document.href}>
                  {document.href}
                </a>
              </p>
            </dd>
            <dt>
              <span className="bb bw2 b--primary-color">Transcript:</span>
            </dt>
            <dd>
              <p className="code document-text">{document.href_text}</p>
            </dd>
          </dl>
          <dl className="dn db-ns w-third-ns pa2">
            <dt>
              <span className="bb bw2 b--primary-color">Categories:</span>
            </dt>
            <dd>
              <ul className="list pl0">
                {document.categories.length === 0 ? (
                  <li className="silver">—</li>
                ) : (
                  document.categories.map((category) => (
                    <li key={category} className="silver">
                      {category}
                    </li>
                  ))
                )}
              </ul>
            </dd>
            <dt>
              <span className="bb bw2 b--primary-color">
                Companies Mentioned:
              </span>
            </dt>
            <dd>
              <ul className="list pl0">
                {document.companies.length === 0 ? (
                  <li className="silver">—</li>
                ) : (
                  document.companies.map((company) => (
                    <li key={company} className="silver">
                      {company}
                    </li>
                  ))
                )}
              </ul>
            </dd>
            <dt>
              <span className="bb bw2 b--primary-color">
                Systems Mentioned:
              </span>
            </dt>
            <dd>
              <ul className="list pl0">
                {document.systems.length === 0 ? (
                  <li className="silver">—</li>
                ) : (
                  document.systems.map((system) => (
                    <li key={system} className="silver">
                      {system}
                    </li>
                  ))
                )}
              </ul>
            </dd>
            <dt>
              <span className="bb bw2 b--primary-color">
                Authorities Mentioned:
              </span>
            </dt>
            <dd>
              <ul className="list pl0">
                {document.authorities.length === 0 ? (
                  <li className="silver">—</li>
                ) : (
                  document.authorities.map((authority) => (
                    <li key={authority} className="silver">
                      {authority}
                    </li>
                  ))
                )}
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}

export default withRouter(DocumentsDetails);
