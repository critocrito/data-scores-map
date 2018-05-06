// @flow
declare module "@sugarcube/plugin-elasticsearch" {
  declare type ElasticQuery = {
    query: {},
    _source: {},
  };

  declare type Api = {
    query: (string, ElasticQuery, number) => Array<{}>,
  };

  declare function Do(
    gen: Generator<*, Promise<[Array<{}>, Array<[string, {}]>]>, *>,
    host: string,
    port: number,
  ): Promise<[Array<{}>, Array<[string, {}]>]>;
  declare export type Elastic = {Do: Do};
}
