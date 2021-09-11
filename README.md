# **_pipedrive-bling_**

This project aims to carry out the technical test of LinkApi

## **Prerequisites**

For full operation of the application is necessary:

- NODE >= 14 or Docker

## **Routes**

- **/bling/pedidos - (GET) -** Lists all Bling orders.
- **/pipedrive - (GET) -** Lists all PipeDrive deals.
- **/pipedrive/execute - (PUT) -** Search all businesses with PipeDrive "won" status and create a new order in Bling.
- **/aggregate - (PUT) -** Validates all requests for the day in Bling and saves the value per day in MongoDB.
- **/aggregate - (GET) -** Returns MongoDB data.
- **/aggregate/:date - (GET) -** Returns MongoDB data filtered by date. Example:
  > /aggregate/2021-09-11

## **Install instructions**

### Getting Started

#### 1) Clone & Install Dependencies

- 1.1) `git clone git@github.com:robertoakang/pipedrive-bling.git`
- 1.2) `cd pipedrive-bling` - cd into your newly created
  project directory
- 1.3) `cp .env.dev .env` - copy environment variables.
  **Note:** check the environment variables according to your local settings
- 1.4) Install NPM packages with `yarn install`

#### 2) Start your app

- 3.1) **[Local]** Run `yarn dev` (starts a nodemon server)
- 3.2) **[Docker]** If you have a docker on your machine:
  - 3.2.1) Local Deploy: `yarn docker-deploy`
  - 3.2.2) Local Logs: `yarn docker-logs`
  - 3.2.3) Local Stop: `yarn docker-stop`
  - 3.2.4) Local Exec: `bash shell.bash local exec {command}`

> Please watch out for the settings on .env or .env.dev
