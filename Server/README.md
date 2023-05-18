# Server template Express + TS + MongoDB

## Description

This is a template for a server using Express, Typescript and MongoDB. It is intended to be used as a starting point for a new project.

## Architecture

The server is built using Express and Typescript. It uses MongoDB as a database. The server uses Controllers to handle the requests and Services to handle the business logic.

For use with Mongo, create Models in the models folder, these cannot be used as types, so if needed, create a class and use it for typing. I also recommend making interfaces for forms in creation and update requests for example.

## Environment

Place the following variables in a .env file in the root of the project:

```bash
PORT=... # Port where the server will run
SERVER_HOST=... # Host where the server will run
MONGO_HOST=... # Host where the mongo database will run, localhost or RPI IP
MONGO_ROOT_USERNAME=... # Username for the root user
MONGO_ROOT_PASSWORD=... # Password for the root user
MONGO_ADMIN_USERNAME=... # Username for the admin user (used by mongo express)
MONGO_ADMIN_PASSWORD=... # Password for the admin user (used by mongo express)
```

## Development

To build the routes and documentation from the controller classes, run the following command:

```bash
npm run predev
```

Then you can run the server with:

```bash
npm run dev
```

## Notes

When running this mongo configuration in raspberry pi you want to use the mongo:bionic image. The mongo:latest image is not compatible with the raspberry pi architecture.

## Documentation

https://tsoa-community.github.io/docs
