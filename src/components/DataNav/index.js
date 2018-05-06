// @flow
import * as React from "react";

import "./index.css";
import SidePanel from "../SidePanel";
import MapContainer from "../MapContainer";
import DataView from "../DataView";
import type {City, Document} from "../../lib/types";

type Props = {
  citiesAll: Array<City>,
  documentsAll: Array<Document>,
};

type State = {
  cities: Array<City>,
  citiesCount: number,
  documentsCount: number,
  selectedKeywords: Array<string>,
  selectedCities: Array<string>,
  documents: Array<Document>,
  list: string,
};

const fetchUnits = async cities => {
  const body =
    cities.length === 0
      ? {}
      : {
          ids: Array.from(
            cities.reduce((memo, city) => {
              Object.keys(city.unitsByKeywords).forEach(keyword =>
                city.unitsByKeywords[keyword].forEach(id => memo.add(id)),
              );
              return memo;
            }, new Set()),
          ),
        };

  const data = await fetch("http://localhost:4000/units", {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then(resp => resp.json());
  return data.data;
};

class DataNav extends React.Component<Props, State> {
  static defaultProps = {
    citiesAll: [],
    documentsAll: [],
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      cities: props.citiesAll,
      citiesCount: props.citiesAll.length,
      documentsCount: props.documentsAll.length,
      selectedKeywords: [],
      selectedCities: [],
      documents: props.documentsAll,
      list: "keywords",
    };
  }

  isSelectedCity(id: string): boolean {
    return this.state.selectedCities.includes(id);
  }

  isSelectedKeyword(keyword: string): boolean {
    return this.state.selectedKeywords.includes(keyword);
  }

  async toggleSelectedCity(id: string) {
    const {citiesAll} = this.props;
    const {selectedCities} = this.state;
    const selected = this.isSelectedCity(id)
      ? selectedCities.filter(i => i !== id)
      : selectedCities.concat(id);
    const cities =
      selected.length > 0
        ? citiesAll.filter(city => selected.includes(city.id))
        : citiesAll;
    const documents = await fetchUnits(cities);
    this.setState({
      selectedCities: selected,
      citiesCount: selected.length,
      documentsCount: documents.length,
      cities,
      documents,
    });
  }

  async toggleSelectedKeyword(keyword: string) {
    const {citiesAll} = this.props;
    const {selectedKeywords} = this.state;
    const selected = this.isSelectedKeyword(keyword)
      ? selectedKeywords.filter(k => k !== keyword)
      : selectedKeywords.concat(keyword);
    const cities =
      selected.length > 0
        ? citiesAll.filter(city =>
            city.keywords.reduce((memo, key) => {
              if (memo) return memo;
              return selected.includes(key);
            }, false),
          )
        : citiesAll;
    const documents = await fetchUnits(cities);
    this.setState({
      selectedKeywords: selected,
      citiesCount: cities.length,
      documentsCount: documents.length,
      cities,
      documents,
    });
  }

  toggleList() {
    const {citiesAll, documentsAll} = this.props;
    const {list} = this.state;
    const newList = list === "keywords" ? "cities" : "keywords";
    this.setState({
      cities: citiesAll,
      documents: documentsAll,
      list: newList,
      selectedKeywords: [],
      selectedCities: [],
      citiesCount: citiesAll.length,
      documentsCount: documentsAll.length,
    });
  }

  resetList() {
    const {citiesAll, documentsAll} = this.props;
    this.setState({
      cities: citiesAll,
      documents: documentsAll,
      selectedKeywords: [],
      selectedCities: [],
      citiesCount: citiesAll.length,
      documentsCount: documentsAll.length,
    });
  }

  render() {
    const {citiesAll} = this.props;
    const {
      documentsCount,
      citiesCount,
      cities,
      documents,
      list,
      selectedKeywords,
    } = this.state;
    return (
      <section>
        <article className="flex">
          <div className="sp-wrapper w-third">
            <SidePanel
              isSelectedKeyword={k => this.isSelectedKeyword(k)}
              selectKeywordHandler={k => this.toggleSelectedKeyword(k)}
              isSelectedCity={c => this.isSelectedCity(c)}
              selectCityHandler={c => this.toggleSelectedCity(c)}
              toggleList={() => this.toggleList()}
              resetList={() => this.resetList()}
              activeList={list}
              cities={cities}
              citiesAll={citiesAll}
            />
          </div>
          <div className="w-two-thirds">
            <MapContainer
              count={citiesCount}
              cities={cities}
              selectedKeywords={selectedKeywords}
            />
          </div>
        </article>
        <article>
          Cities: {citiesCount}, Documents: {documentsCount}
        </article>
        <article>
          <DataView documents={documents} />
        </article>
      </section>
    );
  }
}

export default DataNav;
