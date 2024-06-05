# Restaurant Management Challenge

This repository contains the code, documents, and deployment steps for a Technical Challenge [found here](./CHALLENGE.md).

* Information regarding the design choices for the applications is [found here](./DESIGN.md).
* Information regarding the implementation choices for the applications is [found here](./IMPLEMENTATION.md).

Code of the challenge:

* The API under the *backend* folder.
* The SPA under the *frontend* folder.
* Scripts for CI/CD under the *scripts* folder.

To connecect to the application follow here:
```
https://ec2-52-15-207-50.us-east-2.compute.amazonaws.com/
```
It's expected to get some security error since the SSL certifacate is self-signed.


## Requirements

- Docker (tested on v25.0.2)
- Docker-compose

Building locally:

- Node v18 or above
- Yarn and React for building locally

## Architecture

The application will be a static SPA hosted on an NGINX server.

## Building the Application and Deploying

### Frontend Environment Setup

**IMPORTANT:** You will need to know the URL that the browser will access when using the backend prior to building the application.
    * In this case, the application is hosted under an EC2 virtual machine with NGINX as a reverse proxy.

The webpage is hosted at the `/`:
```
 https://ec2-52-15-207-50.us-east-2.compute.amazonaws.com
```

and the API will be hosted under the `/api`:
```
 https://ec2-52-15-207-50.us-east-2.compute.amazonaws.com/api
```

**CREATE** a file named `.env` under the `frontend` folder with the following values:

```sh
REACT_APP_API=YOUR_API_URL
```

For example, this is mine:
```sh
REACT_APP_API=https://ec2-52-15-207-50.us-east-2.compute.amazonaws.com/api
```

### Backend Environment Setup

The `docker-compose-postgres.yml` provides a quick way to set up a database with default credentials.

You can change the following environment variables in the backend to suit your own PostgreSQL:

```sh
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=secret_password
DB_DATABASE=database
```

You can also modify the secret used to generate the JWTs:
```sh
JWT_SECRET=YOUR_SECRET_TOKEN
```

# TLDR: Build and Deploy

There are many scripts to build and deploy the application. I suggest running `build-and-deploy-local.sh` under the `scripts` folder.

***IMPORTANT:** Set up the `frontend/.env` file as detailed above.*

```sh
cd scripts
./build-and-deploy-local.sh
```

This will build the images and deploy the containers for the application. The application will be hosted on the HTTPS port.

The `docker-compose.yml` contains a version for deploying the application by containers pushed into Docker.
In my case, I'm using the `build-and-push.sh` script to create the app and deploy it.
Change the minor version under the `push.sh` to be the latest.
Under `push.sh` and the `docker-compose.yml`, you will have to change the `vriera` username to your own.

# Detailed Build and Deploy

## Building the Backend

If you have your PostgreSQL locally, you can run:

```sh
yarn
nest run build
```

For building the application into a docker image, an example can be found under the `build-backend.sh` in the `scripts` folder.

## Building the Frontend

This implementation is expected to run as a static website. You can build it in two ways.
*Remember to set up your environment correctly.*

#### Using a Build Container
You can use the `build.sh` script under the `frontend` folder:
```
./build.sh  
```
The build folder will be created.

#### Building Locally

You can run under the `frontend` directory:

```
yarn run build
```

### Nginx

After building the React application, run the script `build-frontend.sh`.

The website can run without NGINX using `yarn run start` on the frontend.