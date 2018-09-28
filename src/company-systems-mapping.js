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

// Other colors still available: #162F64, #10154C
export const colors = {
  Microsoft: "#DEE5B6",
  "Cambridge University": "#E1D691",
  IBM: "#E5C76D",
  Experian: "#E8B849",
  ATOS: "#ECA824",
  CACI: "#EF9900",
  StataCorp: "#CCE6C9",
  Fujitsu: "#ADD9CB",
  "Care First": "#8ECCCD",
  Qlik: "#6FBFCE",
  "Mastodon C": "#4FB1D0",
  Xantura: "#30A4D2",
  Graphnet: "#2D97C6",
  Predpol: "#277DAD",
  "London Ventures": "#216395",
  LiquidLogic: "#1C497D",
  // Those have 0 documents
  Algoworks: "#10154C",
  Canatics: "#10154C",
  TaurusOps: "#10154C",
};
