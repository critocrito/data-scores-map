# data-scores-map

## Synopsis

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![npm version](https://img.shields.io/npm/v/data-scores-map.svg?style=flat)](https://www.npmjs.com/package/data-scores-map) [![Build Status](https://travis-ci.org/critocrito/data-scores-map.svg?branch=master)](https://travis-ci.org/critocrito/data-scores-map) [![Coverage Status](https://coveralls.io/repos/github/critocrito/data-scores-map/badge.svg)](https://coveralls.io/github/critocrito/data-scores-map)

## Installation

Using `npm`:

```sh
npm install --save data-scores-map
```

or using `yarn`:

```sh
yarn add data-scores-map
```

## Usage

## Environment Variables

Use the following environment variables to configure certain behavior of the API server and the client app:

- `DS_HTTP_PORT`: Set the port of the API.
- `DS_ELASTIC_HOST`: Set the host to the Elasticsearch database.
- `DS_ELASTIC_PORT`: Set the port of the Elasticsearch database.
- `DS_ELASTIC_INDEX`: Set the Elasticsearch index to use as a data source.
- `REACT_APP_BASE_URL`: Set the client apps base url.
- `REACT_AAPP_API`: Configure the API endpoint for the client app.

Default values that are useful for development are configured in the `.env` file in the root of the project.

## Development

The following run targets are defined:

- `start`: Build the app and start a reloading development server.
- `compile`: Compile the app for production use.
- `compile:watch`: Watch for changes in the sources and trigger a compile.
- `test`: Run all tests in `test`.
- `test:watch`: Run the tests in watch mode.
- `coverage`: Run the tests and generate a coverage report.
- `lint`: Check the coding style.
- `fix`: Automatically reformat and fix the coding style.
- `flow`: Run the type checker.
- `flow-types`: Install libdefs of dependencies.
- `flow-coverage`: Generate a flow coverage report.
- `build`: Make a full build. Lint, test, type check and compile.
- `release-candidate`: Make a new rc pre-release.
- `release`: Prepare a new release and bump the version number.
- `clean`: Remove compiled sources.
- `security-scan`: Check dependencies in package.json for known
  vulnerabilities. This doesn't check dependencies of dependencies.
- `storybook`: Start the storybook from `./stories`.
- `build-storybook`:
