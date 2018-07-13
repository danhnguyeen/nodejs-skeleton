# Skeleton - Node.js RESTful API [![Build Status](https://travis-ci.org/vitorbritto/node-skeleton.svg)](https://travis-ci.org/vitorbritto/node-skeleton)

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm start` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [multer](https://github.com/expressjs/multer) - For uploading files 
- [babel-cli](https://github.com/babel/babel) - Babel is a compiler for writing next generation JavaScript
- [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) - This package provides Airbnb's base JS .eslintrc as an extensible shared config

## Application Structure

- `server.js`   - The entry point to our application.
- `app.js`      - This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes we'll be using in the application.
- `components/` - This folder contains all the components (included routers, controllers, models).
