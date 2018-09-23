// @flow
export const companies: {[string]: string[]} = {
  Experian: ["Mosaic"],
  CACI: ["Acorn"],
  IBM: ["i2", "iBase", "SPSS"],
  Qlik: ["Qlikview", "Qlikview V12 Desktop", "Qlikview Publisher"],
  Predpol: [],
  Graphnet: ["CareCentric"],
  Canatics: [],
  Xantura: ["Early Help Profiling System", "EHPS"],
  "London Ventures": [],
  LiquidLogic: ["Early Years and Education System", "EYES"],
  StataCorp: ["STATA"],
  "Mastodon C": ["Witan", "Kixi"],
  Microsoft: ["Microsoft Dynamics CRM"],
  TaurusOps: ["Taurus"],
  ATOS: [],
  Fujitsu: [],
  "Cambridge University": ["HART", "Harm and Assessment Risk Tool"],
  "Care First": ["Care First 6"],
  Algoworks: [
    "Sequel Server Reporting Solutions",
    "SQL Server Reporting Solutions",
  ],
};

export const systems: {[string]: string} = Object.keys(companies).reduce(
  (memo, company) => {
    const mapping = companies[company].reduce(
      (acc, system) => Object.assign(acc, {[system]: company}),
      {},
    );
    return Object.assign(memo, mapping);
  },
  {"Red Sigma": ""},
);
