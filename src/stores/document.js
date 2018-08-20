// @flow
import {observable, action, flow} from "mobx";

import {fetchDocument} from "../lib/requests";
import type {Document} from "../lib/types";

export default class DocumentStore {
  @observable
  document: Document | null;

  @action
  setDocument(document: Document) {
    this.document = document;
  }

  @action
  reset() {
    this.document = null;
  }

  // eslint-disable-next-line func-names
  fetchDocument = flow(function*(id) {
    try {
      const {data} = yield fetchDocument(id);
      const [document] = data;
      this.document = document;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  });
}
