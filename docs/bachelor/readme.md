The project can be found on <a href="https://github.com/S3gmentati0nFaultUni/Anagrafica-Aziendale">Github (Bachelor project)</a>

<h2> Introduction </h2>
My bachelor project consisted in the development of a microservice-based web application to securely handle sensitive user data for a company. The project was presented in July 2021.

The project consisted of six components:

- Frontend - Developed using React.js

The following components developed using Spring Boot:

- Gateway - The entry point of the application

- Security microservice

- Backend microservice

And then two MySQL databases:

- Security database - which handles only the basic user information (email, password, isEnabled)

- Primary database - which handles the rest of the user information

To handle the distribution of the microservices both Dockerfile and Docker-compose were used. The UI of the project is shown in the following figure.

<figure>
  <img src="../assets/frontend.png" alt="Could not load the image">
  <figcaption>Home of the user view</figcaption>
</figure>

<h2> Functionalities </h2>
The application allows the generic user to:

- Register

- Login

- Update their information (both personal and linked to hard and soft skills that they might have)

The top level user is able to:

- Cancel users

- Search any user inside the database and view or modify their information

- Disable users

The docker-compose.yaml file was written as follows, since the application was only for demo pourposes the database passwords were as easy as possible and no information was encrypted.

```yaml
version: "3.9"

services:
  userdb:
    container_name: user_database
    image: mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=database-utenti
    ports:
      - "3307:3306"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p password"]
      timeout: 20s
      retries: 15

  securitydb:
    container_name: security_database
    image: mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=database-sicurezza
    ports:
      - "3308:3306"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p password"]
      timeout: 15s
      retries: 15

  blue-whale:
    container_name: gatewayB
    build:
      context: ./backend-gateway
      dockerfile: "Dockerfile"
    ports:
      - "8080:8080"

  sleepin-cat:
    container_name: usersB
    build:
      context: ./backend-gestione-utenti
      dockerfile: "Dockerfile"
    depends_on:
      userdb:
        condition: service_healthy
    ports:
      - "8082:8082"

  honeybear:
    container_name: securityB
    build:
      context: ./backend-login
      dockerfile: "Dockerfile"
    depends_on:
      securitydb:
        condition: service_healthy
    ports:
      - "8081:8081"

  frontend:
    container_name: frontend
    build:
      context: ./frontend
      dockerfile: "Dockerfile"
    ports:
      - "3000:3000"
```

The final thesis for the project can be found on Github as well as the presentation I put together for the final bachelor thesis discussion. The download links are the following:

<a href="https://github.com/S3gmentati0nFaultUni/Tesi-triennale/releases/download/Major/Tesi.pdf">Download last version of the thesis</a>

<a href="https://github.com/S3gmentati0nFaultUni/Tesi-triennale/releases/download/Major/Presentazione.pdf">Download last version of the presentation</a>
