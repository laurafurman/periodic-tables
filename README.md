# Periodic Tables - Restaurant Reservation System

> Periodic Tables is a restaurant reservation application designed to support staff before and during service. Front-of-House staff can edit, track, and cancel reservations, as well as monitor tables that are available. If needed, new tables can be added at any time. 
> 
> Deployed Application: [Periodic Tables](https://periodic-tables-client-two.vercel.app/dashboard)

## Table of Contents

* [Periodic Tables API](#periodic-tables-api)
* [User Experience](#user-experience)
* [Tech Used](#tech-used)
* [Installation](#installation)

## Periodic Tables API

The API allows for creation, reading, and updating reservations and tables. A user may not make a request to edit a table or delete a table or reservation at this time.

## User Experience

### Dashboard
![dashboard](/images/Dashboard.png)

### Add a New Reservation
![new reservation](/images/NewReservation.png)

### Edit an Exisiting Reservation
![edit reservation](/images/EditReservation.png)

### Seat a Reservation
![seat select](/images/SeatSelect.png)
![dashboard seated](/images/DashboardSeated.png)

### Search for an Exisiting Reservation
![search reservations](/images/SearchReservations.png)

### Add a New Table
![add table](/images/AddTable.png)

## Tech Used

### Front End:
* React
* JavaScript
* Bootstrap
* HTML
* CSS

### Back End:
* Node
* Express
* PostgreSQL
* Knex

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.

