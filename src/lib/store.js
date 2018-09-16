// @flow
import {configure, observable, computed, action, flow, toJS} from "mobx";
import {
  document,
  documents,
  search,
  categoryInsights,
  companySystemInsights,
  authorityInsights,
  documentStats,
} from "./requests";

import type {
  Document,
  FullDocument,
  Item,
  CategoryInsight,
  CompanySystemInsight,
  AuthorityInsight,
  Stat,
} from "./types";

configure({enforceActions: true});

export default class Store {
  pageSize = 30;

  @observable
  loadingState: "done" | "pending" | "error" = "done";

  @observable
  categories: Item[] = [];

  @observable
  companies: Item[] = [];

  @observable
  systems: Item[] = [];

  @observable
  authorities: Item[] = [];

  @observable
  document: FullDocument;

  @observable
  documents: Document[] = [];

  @observable
  documentsTotal: number = 0;

  @observable
  categoryInsights: CategoryInsight[] = [];

  @observable
  companySystemInsights: CompanySystemInsight[] = [];

  @observable
  authorityInsights: AuthorityInsight[] = [];

  @observable
  documentStats: Stat[] = [];

  @observable
  documentsFilters: Map<string, string[]> = new Map();

  @computed
  get categoryFilters() {
    if (!this.documentsFilters.has("categories")) return [];
    return toJS(this.documentsFilters.get("categories"));
  }

  @computed
  get authorityFilters() {
    if (!this.documentsFilters.has("authorities")) return [];
    return toJS(this.documentsFilters.get("authorities"));
  }

  fetchDocument = flow(function* fetchDocument(id: string) {
    try {
      const {data} = yield document(id);
      if (data.length > 0) {
        const [doc] = data;
        this.document = doc;
      }
    } catch (e) {
      console.log(e);
    }
  });

  fetchDocuments = flow(function* fetchDocuments(
    exists: string[],
    // categories: string[],
    // authorities: string[],
    from: number,
  ) {
    try {
      const {data, total} = yield documents(
        exists,
        this.categoryFilters,
        this.authorityFilters,
        from,
        this.pageSize,
      );
      this.documents = data;
      this.documentsTotal = total;
    } catch (e) {
      console.log(e);
    }
  });

  searchDocuments = flow(function* searchDocuments(term: string, from: number) {
    const filters = toJS(this.documentsFilters, {exportMapsAsObjects: true});
    if (term !== "") {
      try {
        const {data, total} = yield search(term, filters, from, this.pageSize);
        this.documents = data;
        this.documentsTotal = total;
      } catch (e) {
        console.log(e);
      }
    } else {
      this.clearDocuments();
    }
  });

  fetchCategories = flow(function* fetchCategories() {
    this.loadingState = "pending";
    try {
      const {data} = yield categoryInsights();
      this.loadingState = "done";
      this.categories = data.map(({id, name}) => ({
        id,
        name,
      }));
    } catch (e) {
      this.loadingState = "error";
    }
  });

  fetchCompaniesSystems = flow(function* fetchCompanies() {
    this.loadingState = "pending";
    try {
      const {data} = yield companySystemInsights();
      this.loadingState = "done";
      this.companies = data.map(({id, name}) => ({
        id,
        name,
      }));
      const systemsObj = data.reduce((memo, {systems}) => {
        systems.forEach(({id, name}) => {
          if (memo[name]) return;
          // eslint-disable-next-line no-param-reassign
          memo[name] = {id, name};
        });
        return memo;
      }, {});
      this.systems = Object.keys(systemsObj)
        .map((key) => systemsObj[key])
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (e) {
      this.loadingState = "error";
    }
  });

  fetchAuthorities = flow(function* fetchAuthorities() {
    this.loadingState = "pending";
    try {
      const {data} = yield authorityInsights();
      this.loadingState = "done";
      this.authorities = data.map(({id, name}) => ({
        id,
        name,
      }));
    } catch (e) {
      this.loadingState = "error";
    }
  });

  fetchCategoryInsights = flow(function* fetchCategoryInsights() {
    this.loadingState = "pending";
    try {
      const {data} = yield categoryInsights();
      this.loadingState = "done";
      this.categoryInsights = data;
    } catch (e) {
      this.loadingState = "error";
    }
  });

  fetchCompanySystemInsights = flow(function* fetchCompanySystemInsights() {
    this.loadingState = "pending";
    try {
      const {data} = yield companySystemInsights();
      this.loadingState = "done";
      this.companySystemInsights = data;
    } catch (e) {
      this.loadingState = "error";
    }
  });

  fetchAuthorityInsights = flow(function* fetchAuthorityInsights() {
    this.loadingState = "pending";
    try {
      const {data} = yield authorityInsights();
      this.loadingState = "done";
      this.authorityInsights = data;
    } catch (e) {
      this.loadingState = "error";
    }
  });

  fetchDocumentStats = flow(function* fetchDocumentStats() {
    try {
      const {data} = yield documentStats();
      this.documentStats = data;
    } catch (e) {
      console.log(e);
    }
  });

  @action
  updateFilters(type: string, filters: string[]) {
    this.documentsFilters.set(type, filters);
    this.searchDocuments(0);
  }

  @action
  clearFilters(type: string) {
    this.documentsFilters.set(type, []);
    this.searchDocuments(0);
  }

  @action
  clearAllFilters() {
    this.documentsFilters = new Map();
  }

  @action
  clearDocuments() {
    this.documents = [];
    this.documentsTotal = 0;
  }
}
