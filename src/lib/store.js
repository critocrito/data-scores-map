// @flow
import {configure, observable, computed, action, flow, toJS} from "mobx";
import {
  document,
  documents,
  search,
  companySystemInsights,
  authorityInsights,
  departmentInsights,
  documentStats,
} from "./requests";

import type {
  Document,
  FullDocument,
  Item,
  CompanySystemInsight,
  AuthorityInsight,
  DepartmentInsight,
  Stat,
} from "./types";

configure({enforceActions: true});

export default class Store {
  pageSize = 30;

  @observable
  loadingState: "done" | "pending" | "error" = "done";

  @observable
  companies: Item[] = [];

  @observable
  systems: Item[] = [];

  @observable
  authorities: Item[] = [];

  @observable
  departments: Item[] = [];

  @observable
  document: FullDocument;

  @observable
  documents: Document[] = [];

  @observable
  documentsTotal: number = 0;

  @observable
  documentsPage: number = 0;

  @observable
  companySystemInsights: CompanySystemInsight[] = [];

  @observable
  authorityInsights: AuthorityInsight[] = [];

  @observable
  departmentInsights: DepartmentInsight[] = [];

  @observable
  documentStats: Stat[] = [];

  @observable
  documentsFilters: Map<string, string[]> = new Map();

  @computed
  get companyFilters() {
    if (!this.documentsFilters.has("companies")) return [];
    return toJS(this.documentsFilters.get("companies"));
  }

  @computed
  get systemFilters() {
    if (!this.documentsFilters.has("systems")) return [];
    return toJS(this.documentsFilters.get("systems"));
  }

  @computed
  get authorityFilters() {
    if (!this.documentsFilters.has("authorities")) return [];
    return toJS(this.documentsFilters.get("authorities"));
  }

  @computed
  get departmentFilters() {
    if (!this.documentsFilters.has("departments")) return [];
    return toJS(this.documentsFilters.get("departments"));
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
    from: number,
  ) {
    try {
      const {data, total, page} = yield documents(
        exists,
        this.companyFilters,
        this.systemFilters,
        this.authorityFilters,
        this.departmentFilters,
        from,
        this.pageSize,
      );
      this.documents = data;
      this.documentsTotal = total;
      this.documentsPage = page;
    } catch (e) {
      console.log(e);
    }
  });

  searchDocuments = flow(function* searchDocuments(term: string, from: number) {
    const filters = toJS(this.documentsFilters, {exportMapsAsObjects: true});
    if (term !== "") {
      try {
        const {data, total, page} = yield search(
          term,
          filters,
          from,
          this.pageSize,
        );
        this.documents = data;
        this.documentsTotal = total;
        this.documentsPage = page;
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("haha");
      this.fetchDocuments([], from);
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

  fetchDepartments = flow(function* fetchDepartments() {
    this.loadingState = "pending";
    try {
      const {data} = yield departmentInsights();
      this.loadingState = "done";
      this.departments = data.map(({id, name}) => ({
        id,
        name,
      }));
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

  fetchDepartmentInsights = flow(function* fetchDepartmentInsights() {
    this.loadingState = "pending";
    try {
      const {data} = yield departmentInsights();
      this.loadingState = "done";
      this.departmentInsights = data;
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
  }

  @action
  clearFilters(type: string) {
    this.documentsFilters.set(type, []);
  }

  @action
  clearAllFilters() {
    this.documentsFilters = new Map();
  }

  @action
  clearDocuments() {
    this.documents = [];
    this.documentsTotal = 0;
    this.documentsPage = 0;
  }
}
