// @flow
// $FlowFixMe
import {configure, observable, computed, action, flow} from "mobx";
import {fetchDocuments} from "./requests";

import type {City, Document} from "./types";

configure({enforceActions: true});

export default class Store {
  citiesAll = [];
  documentsAll = [];
  @observable cities: Array<City> = [];
  @observable documents: Array<Document> = [];
  @observable keywords: Array<string> = [];
  @observable selectedCities: Array<string> = [];
  @observable selectedKeywords: Array<string> = [];

  constructor(citiesAll: Array<City> = [], documentsAll: Array<Document> = []) {
    this.citiesAll = citiesAll;
    this.documentsAll = documentsAll;
    this.cities = citiesAll;
    this.documents = documentsAll;
  }

  isSelectedCity(id: string) {
    return this.selectedCities.includes(id);
  }

  isSelectedKeyword(keyword: string) {
    return this.selectedKeywords.includes(keyword);
  }

  @computed
  get citiesCount() {
    return this.cities.length;
  }

  @computed
  get documentsCount() {
    return this.documents.length;
  }

  @action
  toggleKeyword(keyword: string) {
    this.selectedKeywords = this.isSelectedKeyword(keyword)
      ? this.selectedKeywords.filter(k => k !== keyword)
      : this.selectedKeywords.concat(keyword);
    this.cities =
      this.selectedKeywords.length > 0
        ? this.citiesAll.filter(city =>
            city.keywords.reduce((memo, key) => {
              if (memo) return memo;
              return this.selectedKeywords.includes(key);
            }, false),
          )
        : this.citiesAll;
    this.fetchDocuments();
  }

  @action
  toggleCity(id: string) {
    this.selectedCities = this.isSelectedCity(id)
      ? this.selectedCities.filter(i => i !== id)
      : this.selectedCities.concat(id);
    this.cities =
      this.selectedCities.length > 0
        ? this.citiesAll.filter(city => this.selectedCities.includes(city.id))
        : this.citiesAll;
    this.fetchDocuments();
  }

  @action
  reset() {
    this.selectedCities = [];
    this.selectedKeywords = [];
    this.cities = this.citiesAll;
    this.documents = this.documentsAll;
  }

  // eslint-disable-next-line func-names
  fetchDocuments = flow(function*() {
    const unitIds = Array.from(
      this.cities.reduce((memo, city) => {
        Object.keys(city.unitsByKeywords).forEach(k =>
          city.unitsByKeywords[k].forEach(i => memo.add(i)),
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
