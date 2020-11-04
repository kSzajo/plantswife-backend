## API
api is generated via swagger, http://localhost:3069/api/

## Installation

```bash
$ npm install
```

## Running the app

You need to add `.env` file in source folder
DATABASE_USERNAME=user
DATABASE_PASSWORD=password 
DATABASE_PORT=port
additionally you may want to create required schema in db, then just put env var:
CREATE_TABLES=true
rest of env vars:
PORT=port


```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
