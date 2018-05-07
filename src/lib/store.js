// @flow
// $FlowFixMe
import {configure, observable, computed, action, flow} from "mobx";
import {fetchDocuments} from "./requests";

import type {City, Council, Document} from "./types";

configure({enforceActions: true});

export default class Store {
  citiesAll = [];
  documentsAll = [];
  councilsAll = [];
  @observable entity: "cities" | "councils" = "cities";
  @observable cities: Array<City> = [];
  @observable councils: Array<Council> = [];
  @observable documents: Array<Document> = [];
  @observable keywords: Array<string> = [];
  @observable selectedCities: Array<string> = [];
  @observable selectedCouncils: Array<string> = [];
  @observable selectedKeywords: Array<string> = [];

  constructor(
    citiesAll: Array<City> = [],
    councilsAll: Array<Council>,
    documentsAll: Array<Document> = [],
  ) {
    this.citiesAll = citiesAll;
    this.councilsAll = councilsAll;
    this.documentsAll = documentsAll;
    this.cities = citiesAll;
    this.councils = councilsAll;
    this.documents = documentsAll;
  }

  isCitiesEntity() {
    return this.entity === "cities";
  }

  isCouncilsEntity() {
    return this.entity === "councils";
  }

  isSelectedCity(id: string) {
    return this.selectedCities.includes(id);
  }

  isSelectedCouncil(id: string) {
    return this.selectedCouncils.includes(id);
  }

  isSelectedKeyword(keyword: string) {
    return this.selectedKeywords.includes(keyword);
  }

  @computed
  get citiesCount() {
    return this.cities.length;
  }

  @computed
  get councilsCount() {
    return this.councils.length;
  }

  @computed
  get documentsCount() {
    return this.documents.length;
  }

  @computed
  get entities() {
    if (this.entity === "cities") return this.cities;
    return this.councils;
  }

  @computed
  get entitiesAll() {
    if (this.entity === "cities") return this.citiesAll;
    return this.councilsAll;
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
  toggleEntity() {
    this.entity = this.entity === "cities" ? "councils" : "cities";
    this.reset();
    this.fetchDocuments();
  }

  @action
  toggleCouncil(id: string) {
    this.selectedCouncils = this.isSelectedCouncil(id)
      ? this.selectedCouncils.filter(i => i !== id)
      : this.selectedCouncils.concat(id);
    this.councils =
      this.selectedCouncils.length > 0
        ? this.councilsAll.filter(city =>
            this.selectedCouncils.includes(city.id),
          )
        : this.councilsAll;
    this.fetchDocuments();
  }

  @action
  reset() {
    this.selectedCities = [];
    this.selectedCouncils = [];
    this.selectedKeywords = [];
    this.cities = this.citiesAll;
    this.councils = this.councilsAll;
    this.documents = this.documentsAll;
    this.fetchDocuments();
  }

  // eslint-disable-next-line func-names
  fetchDocuments = flow(function*() {
    const unitIds = Array.from(
      this.entities.reduce((memo, entity) => {
        Object.keys(entity.unitsByKeywords).forEach(k =>
          entity.unitsByKeywords[k].forEach(i => memo.add(i)),
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
