# this readme isn't finished yet


## Overwiew

Nodejs REST API written in typescript, using express.js to handle the server creation and the requests routing.
This application lets you query and post artists, labels and releases, all music industry related data, guaranteeing serving always the best version available of a giving document, avoiding corrupted information and duplicates.
All data is persisted in MongoDB, a NoSQL, document-oriented database.

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



## Tests
[supertest](https://www.npmjs.com/package/supertest "supertest"), [jest](https://www.npmjs.com/package/jest "jest")
```
npm run test
```


## Production
pm2
```
npm run start
```

## Creating a release
```
npm run release
```

## Endpoints
- [GET] localhost:8080/api/artist
- [GET] localhost:8080/api/artist/:id
- [GET] localhost:8080/api/artist/id/:id/name/:name


## Configuration
[dotenv](https://www.npmjs.com/package/dotenv "dotenv")

## Hooks
[husky](https://www.npmjs.com/package/husky "husky")
