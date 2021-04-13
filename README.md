## API
api is generated via swagger, http://localhost:3069/api/

## Installation

```bash
$ npm install
```

## Running the app
To run it on mydevil need to create app.js in public_nodejs
with content like:
const aaa = require("./main.js");

You need to add `.env` file in source folder
PLANTS_DATABASE_USERNAME (also used as db name)
PLANTS_DATABASE_PASSWORD
additionally you may want to create required schema in db, then just put env var:
CREATE_TABLES=true
rest of env vars:


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
