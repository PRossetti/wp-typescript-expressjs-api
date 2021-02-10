# this readme isn't finished yet


## Overwiew

Nodejs REST API written in typescript, using express.js to handle the server creation and the requests routing.
This application lets you query and post artists, labels and releases, all music industry related data, guaranteeing serving always the best version available of a giving document, avoiding corrupted information and duplicates.

## Database and models
All data is persisted in MongoDB, a NoSQL, document-oriented database.
The data schema is inferred from the provided json schema and the sample data, that's why fields like the ids, even thought they look like integers, are persisted and handled like strings

## Development

Prerequisites:
- You need to have installed [Nodejs](https://nodejs.org/ "Nodejs") 10.xx.xx or higher

To run this project in development just go throw the following steps:
```
  cd into de project folder
```

```
$ npm i
```

```
 npm run start-dev
```
And that is all! By default the app will be listening on port 8080.

If you have Docker installed, you all can run the whole project inside containers leveraging from docker-compose or you can also make a mix, running your app in local (outside docker) and the database on a container (within docker)

## Loading the database from script
To populate mongodb with the given json data, the express server should be running and connected to the database.
Then in a terminal run the command
```
npm run populate
```

## Tests
[supertest](https://www.npmjs.com/package/supertest "supertest"), [jest](https://www.npmjs.com/package/jest "jest")
```
npm run test
```

# Good practices
- Code written in [typescript](https://www.typescriptlang.org/ "typescript")
- [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/ "Conventional commits")
- Code linting with [eslint](https://eslint.org/ "eslint") and [prettier](https://prettier.io/ "prettier")
- Hooks to commits and pushes with [Husky](https://www.npmjs.com/package/husky "Husky")

## Hooks with [Husky](https://www.npmjs.com/package/husky "Husky")
Before a commit is done, eslint is run so the developer is consisus about eslint warnings and in case of errors, it doesn't commits.
Also the commit has to satisfy the conventional commit standar, otherwise it also doesn't commits.

Before a branch push, besides running eslint again, tests are run and only does the actual push if all of them passes.


## Production
[TODO] pm2 not implemented yet 
```
npm run start
```

## New Relic
[New Relic](https://newrelic.com/ "New Relic") module and configuration file are added to the project configured to run just in production enviroment. 
An app name and New Relic key must be provided. This values should be setted in the file newrelic.js in the following lines
```
app_name: ['SET_YOUR_APP_NAME_HERE'], // TODO: set your New Relic app name
license_key: 'SET_YOUR_LICENSE_KEY_HERE', // TODO: set your New Relic license key 
```

## Creating a release
```
npm run release
```

## Endpoints

- [GET] localhost:8080/api/artist
- [GET] localhost:8080/api/artist/:id
- [GET] localhost:8080/api/artist/id/:id/name/:name

- [GET] localhost:8080/api/release
- [GET] localhost:8080/api/label

- [POST] localhost:8080/api/artist
- [POST] localhost:8080/api/label
- [POST] localhost:8080/api/release


## Configuration
[dotenv](https://www.npmjs.com/package/dotenv "dotenv")
If needed, all node enviroment variables can be configured from the .env file.
This file should not be pushed into the repo, this is a bad and unsecure practice but inside the file you will find a disclaimer and more information about this.


