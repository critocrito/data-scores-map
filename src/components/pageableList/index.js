// @flow
import * as React from "react";

import type {Document} from "../../lib/types";

type Props = {
  documents: Document[],
  documentsTotal: number,
  documentsPage: number,
  paginateDocuments: (page: number) => void,
  pageSize: number,
};

type State = {
  page: number,
  intervalId: IntervalID,
};

const scrollStepInPx = 150;
const delayInMs = 5;

const pageableList = (
  WrappedComponent: React.ComponentType<{
    documents: Document[],
    total: number,
    pagination: React.Node[],
  }>,
) =>
  class extends React.Component<Props, State> {
    static displayName = "PageableList";

    constructor(props: Props) {
      super(props);
      this.state = {
        page: props.documentsPage,
        // $FlowFixMe
        intervalId: null,
      };
    }

    scrollStep = () => {
      const {intervalId} = this.state;
      if (window.pageYOffset === 0) {
        clearInterval(intervalId);
      }
      window.scroll(0, window.pageYOffset - scrollStepInPx);
    };

    scrollToTop = () => {
      const intervalId = setInterval(this.scrollStep.bind(this), delayInMs);

      this.setState({intervalId});
    };

    paginate = async (page: number) => {
      const {paginateDocuments, pageSize} = this.props;
      paginateDocuments(page * pageSize);
      this.setState({page});
      this.scrollToTop();
    };

    pagination(): Array<React.Node> {
      const {documentsTotal, pageSize} = this.props;
      const {page} = this.state;
      const pages = Math.ceil(documentsTotal / pageSize);
      const left =
        page === 0 ? (
          <span key="left" />
        ) : (
          <span
            className="pointer"
            key="left"
            onClick={() => this.paginate(page - 1)}
            onKeyPress={() => this.paginate(page - 1)}
            role="button"
            tabIndex={0}
          >
            &#60; Previous&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        );
      const right =
        page < pages - 1 ? (
          <span
            className="pointer"
            key="right"
            onClick={() => this.paginate(page + 1)}
            onKeyPress={() => this.paginate(page + 1)}
            role="button"
            tabIndex={0}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Next &#62;
          </span>
        ) : (
          <span key="right" />
        );
      return [left, right];
    }

    render() {
      const {documents, documentsTotal} = this.props;
      return documents.length > 0 ? (
        <WrappedComponent
          documents={documents}
          total={documentsTotal}
          pagination={this.pagination()}
        />
      ) : (
        ""
      );
    }
  };

export default pageableList;
