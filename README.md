# FSA

A demo React app using the Food Hygiene Rating Scheme API

You can try it out [here](http://cw-fsa.herokuapp.com/search).

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
$ docker run --name fsa -d -p 8080:80 -e PORT=80 fsa
```

Project is running at http://localhost:8080/

# About

## To Do

This application is far from production ready and there is a lot that can be
done to get it into a better shape.

* Accessibility
* CI/CD/Deployment
* Monitoring
* Performance
* SEO
* Security
* UX
* Other app and code changes

### Accessibility

Accessibility is currently only checked using the eslint jsx-a11y plugin. There are a number of
additional accessibility testing tooling, such as [pa11y](http://pa11y.org/). There RNIB can also
help with accessibility assessment and testing.

### CI/CD/Deployment

The application does not currently have CI setup. Normally I would set this up as early on in the
project as possible to ensure code consistency and quality standards are maintained. Additional
linting should also be setup for CSS/SASS.

For a commercial application I would expect a minimum of development, test and live with a simple
pipeline to promote build through the environments. The application is currently deployed to Heroku
which can provide this pipeline mechanism. However, the application is packaged as a docker
container so there are many deployment options.

### Monitoring

* Use an APM monitoring tool like New Relic
* Adding log aggregation tooling like ElasticSearch, LogStash and Kibana

Use of an APM monitoring tool like New Relic is not quite a high priority in this case as the
application is served by Nginx. However, if the application was changed to universal rendering (e.g.
for SEO etc) an APM monitoring tool would be required.

### Performance

* Evaluate the results of tools like [PageSpeed](https://developers.google.com/speed/?hl=en-US&utm_source=PSI&utm_medium=incoming-link&utm_campaign=PSI)
* Load test application to ensure it can handle production loads using tools like [Gatling](https://gatling.io/)

### Security

Once deployed, headers listed below should be set as well as strong Content Security Policy.
Depending on the how the application is deployed this could be Nginx configuration or if using
express for universal rendering this can be done with the help of tools such as
[helmet](https://github.com/helmetjs/helmet).

* X-Content-Type-Options: nosniff
* X-Frame-Options: DENY
* X-XSS-Protection: 1; mode=block

In addition, threat modelling and formal penetration testing can be useful for assessing the
security of new application.

### SEO

* Add [Structured Data](https://developers.google.com/search/docs/guides/intro-structured-data)
* Add a robots.txt policy
* Add universal rendering for web crawlers

### UX

The UX and visual design could be improved significantly.

### Other app and code changes

The application currently does not use a state container, such as redux. This could improve the
application performance and server load. For example, changing the selection back to a previously
selected authority would be able to retrieve the current state from the redux store rather than
re-fetching.

This is a simple single page application. As the feature set grows a routing solution will likely be
appropriate e.g. react-router

The API client only completes basic error handling. For a production application I would expect it
to handle any errors in the API response and display or retry the request as appropriate. Using new
react features such as error boundaries. In addition, client side errors should be logged to an APM
monitoring tool or logging solution.

There are a few presentational components in the project. As they are only presentational they could
be tested using snapshot testing. Storybook is a really useful tool, allowing you to both setup
example component state, inspect components in a browser and implement snap shot testing.

In addition, in a more mature application I would expect to have a number of higher level key user
journey / UI automation tests implemented using a tool like Nightwatch or similar. These tests would
then form part of the CD pipeline, being run and validated after deployment to test and live.
