# Cr5 Public Demo

This project implements a public demo of Cr5 with [cr5-lib](https://github.com/epfl-dlab/cr5-lib). The project contains frontend and backend components.

## Frontend

The frontend design is inspired by the public demo of [WikiPDA](https://github.com/epfl-dlab/WikiPDA/tree/master/WikiPDA-HTTP-API/demo_html). 

Instead of using pure HTML / CSS, the frontend component is implemented with React and TypeScript. The style is implemented by a wrapper of the original `bootstrap`, namely `react-bootstrap`.

### Usage

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Hence, it is highly recommended to run / build the project with ```yarn```. Since ```yarn``` includes breaking changes between v1 and v2, please note that we use [v1](https://classic.yarnpkg.com/lang/en/docs/install/) in our project.

#### Run with Local Environment

##### Install Dependencies (required only once)

```bash
# make sure that you have node installed
npm install --global yarn

cd frontend

yarn install
```

##### Serve the Project Locally

By default, the frontend uses the backend at: ```http://localhost:5005```.

To override the setting, use environment variable ```REACT_APP_HOST_URL```.

```bash
REACT_APP_HOST_URL=some_different_host yarn start
```

##### Deploy the Project

```bash
REACT_APP_HOST_URL=some_different_host yarn build
```

#### Run with Docker Image

If you prefer to use an isolated environment instead of installing `yarn` locally, we recommend using the official `node` image.

```bash
cd frontend

docker pull node:lts

# Mount current directory into folder and set port forwarding between host machine and container
docker run -v `pwd`:`pwd` -w `pwd` -p 3000:3000 -it node:lts /bin/bash

# Install the required node modules (required only once)
yarn install

# Start the server locally. You can access the web page from the host machine at: localhost:3000
yarn start

# Build the production files
yarn build

```

## Backend

The backend component is implemented with ```flask``` framework with several features:
- Rate limiter. By default the limit is `2 per second`. To override the default value, set the environment variable `RATE_LIMIT` to other values.
- Swagger docs. Assuming the API is running on `localhost:5005`, the Swagger documentation can be accessed at: `localhost:5005/apidocs`

### Dependencies

In addition to the dependencies of [cr5-lib](https://github.com/epfl-dlab/cr5-lib#dependencies), the backend requires:

- `Flask`, for providing the basic framework
- `Flask-Cors`, for providing support for CORS
- `Flask-Inputs`, for validating input data by JSON schema
- `Flask-Limiter`, for rate limiting
- `flasgger`, for providing API docs

### Usage

#### Run with Local Environment
##### Configure Data Folder

```bash
export LEVEL_DB_DIR=/path/to/leveldb/files
export SEARCH_INDEXES_DIR=/path/to/search_indexes/files
```

##### [Optional] Set API Host, Port, and Rate Limit

```bash
export APP_HOST=some_other_ip
export APP_PORT=some_other_port_number
export RATE_LIMIT=some_other_rate_limit_policy
```

##### Start the API

```bash
python app.py
```

#### Run with Docker Image
Use the [Dockerfile](https://github.com/epfl-dlab/cr5-demo/blob/master/backend/Dockerfile) which creates an environment named ```cr5-demo```.

Note that, in the script below, we assume there will be a root of data directory, namely ```/path/to/the/root/of/data/directory```. The detailed layout is specified [here](https://github.com/epfl-dlab/cr5-lib#data-storage). Only subdirectories ```level_db``` and ```search_indexes``` are needed since the API runs in a memory-efficient manner.

```bash
cd backend

# Inside backend directory, build the docker image
docker build -t cr5-demo:latest .

docker run -it -p 5005:5005 -v /path/to/the/root/of/data/directory:/data cr5-demo:latest

# Inside docker container
python app.py

```

Now you can visit the API docs at ```localhost:5005/apidocs``` and make requests to the API.

## Visit Our Public Demo
Our public demo is currently deployed [here](http://testing.dlab.tools/cr5/index.html).