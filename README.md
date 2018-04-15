# FSA

A demo React app using the Food Hygiene Rating Scheme API

## Prerequisites

1. [Node v8.11.1](https://nodejs.org/en/download/)
1. [Yarn](https://yarnpkg.com/en/docs/install)

## Installation

```sh
$ git clone git@gitlab.com:ChrisWilding/fsa.git
$ cd fsa
$ yarn install

```

## Usage

```sh
$ yarn start
yarn run v1.5.1
$ webpack-dev-server
Project is running at http://localhost:8080/
...
```

# Docker

### Prerequisites

1. [Docker](https://www.docker.com/community-edition)

### Usage

```sh
$ docker build -t fsa .
$ docker run --name fsa -d -p 8080:80 fsa
```

Project is running at http://localhost:8080/
