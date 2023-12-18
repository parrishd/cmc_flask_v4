
# CMC Data Explorer (https://cmc.vims.edu)

CMC Data Explorer

## Preference is to Run with Docker Development Environments (Collaboration)

- Open in the Dev Environments feature of Docker Desktop:

[Open in Docker Dev Environments](https://open.docker.com/dashboard/dev-envs?url=https://github.com/parrishd/cmc_frontend_v4.git)

To open this link:

- select the **Create** button in the top right-hand corner (inside the Dev Docker Desktop), select source **Existing Git repo**, and then paste the URL.



---
## For other local installation options, read further


## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).


### Documentation/Shared Files

---

*added by Cassia Pianca (11-Dec-2023)*

<!-- # Run with Docker (no development mode)

VIMS Data Explorer

## Prerequisites:

- Docker Desktop (https://docs.docker.com/get-docker/)
- Dockerfile and ngxin.conf files already created.

### Build the docker image

- open the Docker Desktop
- docker uses the Dockerfile to build the image.

- To build the docker image, in the terminal, enter the following command:
```bash
docker build -t cmc_frontend .
```

### Run the docker container

- to run the docker container, in the terminal, enter the following command:

```bash
docker run -dp 127.0.0.1:8000:80 cmc_frontend
```

- to open the app in the browser: http://localhost:8000 -->


## Run with Docker-Compose (Locally)


- Build and run the application in development mode with docker-compose, locally.

### Prerequisites:


- Docker Desktop (https://docs.docker.com/get-docker/)
- Dockerfile, ngxin.conf and docker-compose.yaml files already created.



#### To run first time

- to run the docker-compose, enter the following command:


 ```bash
docker-compose up --build
```


- to open the app in the browser: http://localhost:8080/
- The application will be saved in a Docker container. If you change the code, the application reloads on the browser with the new changes.
- To run the app next time, just go to Docker Desktop, start the container, and open the app in the browser http://localhost:8080/

