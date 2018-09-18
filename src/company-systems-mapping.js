// @flow
export const companies: {[string]: string[]} = {
  experian: ["mosaic"],
  caci: ["acorn"],
  ibm: ["i2", "ibase", "spss"],
  qlik: ["qlikview", "qlikview v12 desktop", "qlikview publisher"],
  predpol: [],
  graphnet: ["care centric"],
  canatics: [],
  xantura: ["early help profiling system", "ehps"],
  "london ventures": [],
  liquidlogic: ["early years and education system", "eyes"],
  statacorp: ["stata"],
  "mastodon c": ["witan", "kixi"],
  microsoft: ["microsoft dynamics crm"],
  taurusops: ["taurus"],
  atos: [],
  fujitsu: [],
  "cambridge university": ["hart", "harm and assessment risk tool"],
  "care first": ["care first 6"],
  algoworks: [
    "sequel server reporting solutions",
    "sql server reporting solutions",
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
  {},
);
