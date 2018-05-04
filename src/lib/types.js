// @flow
export type Position = [number, number];

export type UnitIds = Array<string>;

export type City = {
  id: string,
  name: string,
  county: string,
  position: Position,
  count: number,
  unitIds: UnitIds,
  keywords: Array<string>,
  unitsByKeywords: {[keyword: string]: UnitIds},
};
