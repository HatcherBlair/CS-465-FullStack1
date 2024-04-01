# CS-465-FullStack1 - Travlr Getaways

## Description

### This repository contains 3 separate items, a static HTML customer-facing website, a RESTful API, and an Angular SPA.

#### Static HTML Customer Facing Website

The static website is built using Node, Express, and Handlebars. All of the related files are contained in the app_server directory and the website follows the MVC architecture.

#### RESTful API

The API is built using Node, Express, and MongoDB. All of the related files are contained in the app_api directory. The API serves data from the database to the static HTML website as well as the Angular SPA

#### Angular SPA

The Angular page is built using Angular(duh) and Bootstrap. The application contains a login screen that verifies users with JWTs. Once the user is logged in and verified, you can add, edit, and delete trips in the database. There is currently no way to create an account as this applications purpose is for company administrators to modify information in the database. However, there is a route for registering a user and you can send requests to that route to create a user.

## How to Install and Run

1. Fork the Repo and clone into a local directory
2. Navigate to the base project directory and install dependencies

```Bash
npm install
```

3. Create the environment variables

- In the top-level directory make a new file `.env`
- The only required environment variable is the secret for JWT authentication `JWT_SECRET`
- You can make the secret whatever you want, for example: `JWT_SECRET=superdupersecret`

5. You can now run the static website and the API using `npm start` or `npm run nodemon`. Nodemon will watch for changes and automatically restart the server if there is a change.

- NOTE: This project is configured to use a local MongoDB instance, if you want to use a remote MongoDB instance the URI is located in ./app_api/models/db.js

6. Navigate to the app_admin directory
7. Install the dependencies for the Angular website by running:

```Bash
npm install
```

7. Run the command `ng serve` to start the server

#### The static website and API are available at localhost:3000\

#### The Angular website is available at localhost:4200

8. This project uses seedgoose to seed the database. To seed the database all you need to do is run:

```Bash
./node_modules/.bin/seedgoose seed
```

- If you are using a remote MongoDB instance you will need to modify .seedgooserc.js to the new database URI
