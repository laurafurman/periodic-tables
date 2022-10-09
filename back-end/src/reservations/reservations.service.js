// const {
//   default: ReservationForm,
// } = require("../../../front-end/src/dashboard/ReservationForm");
const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function list(reservationDate) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: reservationDate })
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

module.exports = {
  create,
  list,
  read,
};
