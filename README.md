# Cr5 Public Demo

This project implements a public demo of Cr5 with [cr5-lib](https://github.com/epfl-dlab/cr5-lib). The project contains frontend and backend components.

## Frontend

The frontend design is inspired by the public demo of [WikiPDA](https://github.com/epfl-dlab/WikiPDA/tree/master/WikiPDA-HTTP-API/demo_html). 

Instead of using pure HTML / CSS, the frontend component is implemented with React and TypeScript.

### Usage

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Hence, it is highly recommended to run / build the project with ```yarn```. Since yarn includes breaking changes between v1 and v2, please note that we use [v1](https://classic.yarnpkg.com/lang/en/docs/install/) in our project.

#### Install Dependencies (required only once)

```bash
# make sure that you have node installed
npm install --global yarn

yarn install
```

#### Run the Project Locally

By default, the frontend uses the backend at: ```http://localhost:5005```.

To override the setting, use environment variable ```REACT_APP_HOST_URL```.

```bash
REACT_APP_HOST_URL=some_different_host yarn start
```

#### Deploy the Project

```bash
REACT_APP_HOST_URL=some_different_host yarn build
```

## Backend

The backend component is implemented with flask framework with several features:
- Rate limiter. By default the limit is `2 per second`. To override the default value, set the environment variable `RATE_LIMIT` to other values.
- Swagger docs. Assuming the API is running on `localhost:5005`, the Swagger documentation can be accessed at: `localhost:5005/apidocs`

### Usage

#### Configure Data Folder

```bash
export LEVEL_DB_DIR=/path/to/leveldb/files
export SEARCH_INDEXES_DIR=/path/to/search_indexes/files
```

#### [Optional] Set API Port and Rate Limit

```bash
export APP_PORT=some_other_port_number
export RATE_LIMIT=some_other_rate_limit_policy
```

#### Start the API

```bash
python app.py
```