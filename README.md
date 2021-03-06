## Overwiew

Nodejs REST API written in typescript, using express.js to handle the server creation and the requests routing.
This application lets you query and post artists, labels and releases, all music industry related data, guaranteeing serving always the best version available of a giving document, avoiding corrupted information and duplicates.

## Database and models

All data is persisted in MongoDB, a NoSQL, document-oriented database.
The data schema is inferred from the provided json schema and the sample data, that's why fields like the ids, even thought they look like integers, are persisted and handled like strings

## Development

##### Prerequisites:
You need to have installed:
- [Nodejs](https://nodejs.org/ "Nodejs") 10.xx.xx or higher
- [Docker (optional)](https://www.docker.com/get-started "Docker") (In local and non-productive environment, you don't need docker to run this project, keep reading)

To run this app in development just go throw the following steps:
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

If you want to run the database inside Docker so this way your data is persisted in a volume, instead of running the `start-dev` script, running this other one:
```
npm run start-with-db
```

## Starting the database [mongoDB](https://www.mongodb.com/es "MongoDB") and populating it

This project provides two ways to run a mongodb database. If you execute the script `npm run start-dev`, by default, mongo would run in memory with the module [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server "mongodb-memory-server").
If you run the script `npm run start-with-db` this will automatically start mongodb in Docker and when you kill the script it will also automatically stop the container.

If the script `npm run start` is executed, which is the one meant for production, you should at least start mongodb first with the script `npm run db-start`.

Keep in mind that the cointainer will run linked to a volume where data will be persisted.

To populate mongodb with the given json data, there are two ways:
The easiest one is just making sure you have the node environment variable `POPULATE_DATABASE` set to `'true'`. This will indicate the server to run the `populateDatabase` script that will get the job done.

The other way consist in first making sure you have the express server listening and then just run the following script:
```
npm run populate
```
Keep in mind that the script `npm run start-dev` already has `POPULATE_DATABASE` set to `'true'`. With the other scripts you have to change it yourself. For more information on how to do this go to the [configuration section](https://github.com/PRossetti/wp-typescript-expressjs-api/blob/master/README.md#configuration "configuration section").

## Debugging

The project already has a .vscode/lauch.json configured so with just hitting the Visual Studio Code green debugger button you can start debugging.
First run the server with `npm run start-dev`
Go to the debugger section of VSCode IDE and hit the green boton (Attach to Process should be selected)
Now from the list that appears, you have to choose your project process which should be the first one 

## Tests

Stack: [supertest](https://www.npmjs.com/package/supertest "supertest"), [jest](https://jestjs.io/ "jest")
```
npm run test
```
The project has more than **95% of code coverage**. If coverage goes under 95% it doesn't let you `git push` your code.
Tests can be debugged with Visual Studio Code, just follow this steps:
Open in the IDE the `Jest` test file you want to debug and make sure you have that file tab selected.
GO to the VS Code Debugger and select `Jest Current File` and hit play. That's all! Now you can not only debug the test code but also your aplication code.

## Performance

- A custom `cache middleware` is implemented so GET requests are cached, by default for `60 seconds`. This ttl value can be change with the Node environment variable `CACHE_TTL`. The cacheMiddleware leverages from [node-cache](https://www.npmjs.com/package/node-cache "node-cache") module.
- The module [compression](https://www.npmjs.com/package/compression "compression") can be enabled with just setting `ENABLE_COMPRESSION` Node environment variable to true (this can be done with the file .env).
- In general the app is written trying to be efficient but balancing with a sintaxis and patterns most likely to be friendly for most developers.


## Good practices
- Code written in [typescript](https://www.typescriptlang.org/ "typescript") which reduces the chance of bugs reaching produccion and makes the source code more legible, maintainable and enriched with more intellisense which developers will thank
- [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/ "Conventional commits")
- Code linting with [eslint](https://eslint.org/ "eslint") and [prettier](https://prettier.io/ "prettier")
- Hooks to commits and pushes with [Husky](https://www.npmjs.com/package/husky "Husky")

## Hooks with [Husky](https://www.npmjs.com/package/husky "Husky")
Before a commit is done, eslint is run so the developer is consisus about eslint warnings and in case of errors, it doesn't commits.
Also the commit has to satisfy the conventional commit standar, otherwise it also doesn't commits.

Before a branch push, besides running eslint again, tests are run and only does the actual push if all of them passes.


## Production

```
npm run start
```
This will run the express server in cluster mode with one instance per each cpu available

## New Relic

[New Relic](https://newrelic.com/ "New Relic") module and configuration file are added to the project configured to run just in production environment and only if environment variable `ENABLE_NR` is set to `'true'`
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

Here there are listed just a few, to see more options and requests examples, search in the project root for the **Postman collection** file named [api.postman_collection.json](https://github.com/PRossetti/wp-typescript-expressjs-api/blob/master/api.postman_collection.json "api.postman_collection.json")

- [GET] localhost:8080/api/artist
- [GET] localhost:8080/api/release-data/artist
- [GET] localhost:8080/api/artist/:id
- [GET] localhost:8080/api/artist/id/:id/name/:name
- [GET] localhost:8080/api/release
- [GET] localhost:8080/api/label

- [POST] localhost:8080/api/artist
- [POST] localhost:8080/api/label
- [POST] localhost:8080/api/release


## Configuration

If needed, all node environment variables can be configured from the .env file used by [dotenv](https://www.npmjs.com/package/dotenv "dotenv").
This file should not be pushed into the repo, this is a bad and unsecure practice but inside the file you will find a disclaimer and more information about this.
Also, for development only, you can change the node environment variables from the nodemon.json file.
The other way is to just set them directly on the scripts, on the package.json file.
