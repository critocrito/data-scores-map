// @flow
import {observable, action} from "mobx";

import type {Document} from "../lib/types";

export default class SearchStore {
  @observable
  results: Document[] = [];

  @action
  setResults(results: Document[]) {
    this.results = results;
  }
}
