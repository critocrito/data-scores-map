// @flow
import {configure, observable, computed, action, flow} from "mobx";
import {fetchDocuments} from "./requests";

import type {Council, Document} from "./types";

configure({enforceActions: true});

export default class Store {
  @observable activeView: "keywords" | "councils" = "keywords";
  @observable councils: Council[] = [];
  @observable documents: Array<Document> = [];
  @observable selectedCouncils: Array<string> = [];
  @observable selectedKeywords: Array<string> = [];

  isSelectedCouncil(id: string) {
    return this.selectedCouncils.includes(id);
  }

  isSelectedKeyword(keyword: string) {
    return this.selectedKeywords.includes(keyword);
  }

  @computed
  get keywords() {
    return Array.from(
      this.councils.reduce((memo, council) => {
        council.keywords.forEach(k => memo.add(k));
        return memo;
      }, new Set()),
    );
  }

  @computed
  get councilsForSelectedKeywords() {
    return this.selectedKeywords.length > 0
      ? this.councils.filter(council =>
          council.keywords.reduce((memo, key) => {
            if (memo) return memo;
            return this.isSelectedKeyword(key);
          }, false),
        )
      : this.councils;
  }

  @computed
  get councilsForSelectedCouncils() {
    return this.selectedCouncils.length > 0
      ? this.councils.filter(({id}) => this.isSelectedCouncil(id))
      : this.councils;
  }

  @computed
  get activeCouncils() {
    return this.activeView === "keywords"
      ? this.councilsForSelectedKeywords
      : this.councilsForSelectedCouncils;
  }

  @computed
  get hasSelected() {
    return this.activeView === "keywords"
      ? this.selectedKeywords > 0
      : this.selectedCouncils > 0;
  }

  @computed
  get documentsCount(): number {
    return this.documents.length;
  }

  @computed
  get councilsCount(): number {
    return this.activeCouncils.length;
  }

  @action
  setCouncils(councils: Council[]) {
    this.councils = councils;
    this.reset();
  }

  @action
  toggleView() {
    this.activeView = this.activeView === "keywords" ? "councils" : "keywords";
    this.reset();
  }

  @action
  toggleKeyword(keyword: string) {
    this.selectedKeywords = this.isSelectedKeyword(keyword)
      ? this.selectedKeywords.filter(k => k !== keyword)
      : this.selectedKeywords.concat(keyword);
    this.fetchDocuments();
  }

  @action
  toggleCouncil(id: string) {
    this.selectedCouncils = this.isSelectedCouncil(id)
      ? this.selectedCouncils.filter(i => i !== id)
      : this.selectedCouncils.concat(id);
    this.fetchDocuments();
  }

  @action
  reset() {
    this.selectedCouncils = [];
    this.selectedKeywords = [];
    this.fetchDocuments();
  }

  // eslint-disable-next-line func-names
  fetchDocuments = flow(function*() {
    const unitIds = Array.from(
      this.activeCouncils.reduce((memo, council) => {
        Object.keys(council.unitsByKeywords).forEach(k =>
          council.unitsByKeywords[k].forEach(i => memo.add(i)),
        );
        return memo;
      }, new Set()),
    );
    try {
      const {data: documents} = yield fetchDocuments(unitIds);
      this.documents = documents;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  });
}
