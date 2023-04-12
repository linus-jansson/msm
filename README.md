# msm-api <span style="font-size:12px">Project is highly inspired by [juaneth/Omnipetal-Daemon](https://github.com/juaneth/Omnipetal-Daemon)</span>
**Msm Api** is a REST API to create and manage **minecraft servers** with Docker. 

## Requirments
- Docker Engine vX.xx.x
- Yarn v1.22.x
- Node v18.x

## Setup
```bash
cd <project_dir>
yarn install
```

.env file
```bash
DATABASE_URL="File:<PATH TO SQLITE DB>"

```

## Contribution

## Seting up env


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).


## Roadmap
- [ ] Alternative to Docker 
    - if docker is not installed on the host machine, ask the user if they want to install it
        - if yes, install docker engine
        - if no, install java enviroment, jar file?