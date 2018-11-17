// @flow
import * as React from "react";

type Props = {
  companyFilters: string[],
  systemFilters: string[],
  authorityFilters: string[],
  departmentFilters: string[],
  clearFilters: () => void,
  updateFilters: (string, string[]) => void,
};

const FilterTags = ({
  companyFilters,
  systemFilters,
  authorityFilters,
  departmentFilters,
  clearFilters,
  updateFilters,
}: Props) => (
  <section id="filters" className="ph2-ns w-90 center mt5">
    <div className="bb flex justify-between">
      <div className="w-75">
        <p>Selected filters:</p>
      </div>
      <div className="w-25 tr">
        <button
          className="black f7 pt3 ttu b bg-transparent"
          type="button"
          onClick={clearFilters}
        >
          Clear all x{" "}
        </button>
      </div>
    </div>
    <div className="flex flex-wrap">
      {companyFilters.map((filter) => (
        <button
          type="button"
          key={filter}
          onClick={() =>
            updateFilters(
              "companies",
              companyFilters.filter((f) => f !== filter),
            )
          }
          className=" bg-transparent"
        >
          <span className="f6 ph3 pv2 primary-color br-pill ba bw1 b--primary-color pa1 ma1 dim dib">
            {filter}
          </span>
        </button>
      ))}
      {systemFilters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() =>
            updateFilters("systems", systemFilters.filter((f) => f !== filter))
          }
          className="mt3 bg-transparent"
        >
          <span className="f6 ph3 pv2 primary-color br-pill ba bw1 b--primary-color pa1 ma1 dim">
            {filter}
          </span>
        </button>
      ))}
      {authorityFilters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() =>
            updateFilters(
              "authorities",
              authorityFilters.filter((f) => f !== filter),
            )
          }
          className="mt3 bg-transparent"
        >
          <span className="f6 ph3 pv2 primary-color br-pill ba bw1 b--primary-color pa1 ma1 dim">
            {filter}
          </span>
        </button>
      ))}
      {departmentFilters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() =>
            updateFilters(
              "departments",
              departmentFilters.filter((f) => f !== filter),
            )
          }
          className="mt3 bg-transparent"
        >
          <span className="f6 ph3 pv2 primary-color br-pill ba bw1 b--primary-color pa1 ma1 dim">
            {filter}
          </span>
        </button>
      ))}
    </div>
  </section>
);

export default FilterTags;
