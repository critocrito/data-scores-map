// @flow
import * as React from "react";

import DocumentsCardsRow from "../DocumentsCardsRow";
import pageableList from "../pageableList";
import type {Document} from "../../lib/types";

type Props = {
  documents: Document[],
  pagination: React.Node[],
};

const DocumentsCards = ({documents, pagination}: Props) => (
  <div>
    {documents.map(
      ({
        id,
        title,
        description,
        authorities,
        departments,
        source,
        companies,
        systems,
        highlights,
      }) => (
        <DocumentsCardsRow
          key={id}
          id={id}
          title={title}
          description={description}
          authorities={authorities}
          departments={departments}
          source={source}
          companies={companies}
          systems={systems}
          highlights={highlights || {}}
        />
      ),
    )}
    <hr />
    <div className="center tc ma3">{pagination}</div>
  </div>
);

export default pageableList(DocumentsCards);
