// @flow
import * as React from "react";
import {Link} from "react-router-dom";

import "./index.css";
import {sourcify} from "../../lib/utils";
import type {Highlights} from "../../lib/types";

type Props = {
  id: string,
  title: string,
  description: string,
  authorities: string[],
  departments: string[],
  source: string,
  companies: string[],
  systems: string[],
  highlights: Highlights,
};

const DocumentsCardsRow = ({
  id,
  title,
  description,
  authorities,
  departments,
  source,
  companies,
  systems,
  highlights,
}: Props) => {
  const highlightsValues = ["title", "description", "href_text"].reduce(
    (memo, key) => (highlights[key] ? memo.concat(highlights[key]) : memo),
    [],
  );
  const document = {companies, systems, authorities, departments};

  return (
    <div className="card w-100 mv4 mh2 pa2 ba br3 b--light-silver shadow-4 flex">
      <div className="w-100 w-50-ns ma2">
        <Link className="link no-underline" to={`/${id}`} target="_blank">
          <h2 className="f3 primary-color">{title}</h2>
        </Link>

        <p>{description}</p>
        <p>
          <span className="b">Source: </span>
          <span>{sourcify(source)}</span>
        </p>
        <div className="h-50 overflow-y-auto">
          {["companies", "systems", "authorities", "departments"].map((key) => (
            <p key={key}>
              <span className="b ttc">{`Mentions of ${key}: `}</span>
              <span className="i">
                {document[key].length > 0 ? document[key].join(", ") : "—"}
              </span>
            </p>
          ))}
        </div>
      </div>
      <div className="w-100 w-50-ns ma2">
        <p>Found {highlightsValues.length} occurences.</p>
        <div className="h-75 overflow-y-auto">
          <ul className="list pl0">
            {highlightsValues.map((highlight, index) => (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={`${index}-${highlight.slice(0, 20).replace(/\s/g, "-")}`}
                className="pa3"
                dangerouslySetInnerHTML={{__html: `... ${highlight} ...`}}
              />
            ))}
          </ul>
        </div>
        <div className="ma2 pt1 tr">
          <Link
            className="i no-underline primary-color"
            to={`/${id}`}
            target="_blank"
          >
            See full document
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocumentsCardsRow;
