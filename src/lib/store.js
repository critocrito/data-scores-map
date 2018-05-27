// @flow
import {configure, observable, computed, action, flow} from "mobx";
import {fetchDocuments} from "./requests";

import type {Place, Document} from "./types";

configure({enforceActions: true});

export default class Store {
  citiesAll = [];
  documentsAll = [];
  councilsAll = [];
  @observable entity: "cities" | "councils" = "cities";
  @observable entities: Place[] = [];
  @observable documents: Array<Document> = [];
  @observable keywords: Array<string> = [];
  @observable selectedCities: Array<string> = [];
  @observable selectedCouncils: Array<string> = [];
  @observable selectedKeywords: Array<string> = [];

  constructor() {
    this.entities = this.citiesAll;
    this.documents = this.documentsAll;
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
  get documentsCount(): number {
    return this.documents.length;
  }

  @computed
  get entitiesCount(): number {
    return this.entities.length;
  }

  @computed
  get entitiesAll() {
    return this.entity === "cities" ? this.citiesAll : this.councilsAll;
  }

  @action
  setCities(cities: Place[]) {
    this.citiesAll = cities;
    this.reset();
  }

  @action
  setCouncils(councils: Place[]) {
    this.councilsAll = councils;
    this.reset();
  }

  @action
  toggleKeyword(keyword: string) {
    this.selectedKeywords = this.isSelectedKeyword(keyword)
      ? this.selectedKeywords.filter(k => k !== keyword)
      : this.selectedKeywords.concat(keyword);
    this.entities =
      this.selectedKeywords.length > 0
        ? this.entitiesAll.filter(entity =>
            entity.keywords.reduce((memo, key) => {
              if (memo) return memo;
              return this.selectedKeywords.includes(key);
            }, false),
          )
        : this.entitiesAll;
    this.fetchDocuments();
  }

  @action
  toggleCity(id: string) {
    this.selectedCities = this.isSelectedCity(id)
      ? this.selectedCities.filter(i => i !== id)
      : this.selectedCities.concat(id);
    this.entities =
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
    this.entities =
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
    this.documents = this.documentsAll;
    this.entities = this.isCitiesEntity() ? this.citiesAll : this.councilsAll;
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
