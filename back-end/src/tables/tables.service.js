const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id: table_id }).first();
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update({ reservation_id, table_id }) {
  return knex.transaction((trx) => {
    return knex("reservations")
      .transacting(trx)
      .where({ reservation_id })
      .update({ status: "seated" })
      .then(() => {
        return knex("tables")
          .transacting(trx)
          .where({ table_id })
          .update({ reservation_id: reservation_id })
          .returning("*");
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
}

function finish({ table_id, reservation_id }) {
  return knex.transaction((trx) => {
    return knex("reservations")
      .transacting(trx)
      .where({ reservation_id })
      .update({ status: "finished" })
      .then(() => {
        return knex("tables")
          .transacting(trx)
          .where({ table_id })
          .update({ reservation_id: null })
          .returning("*");
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
}

module.exports = {
  list,
  read,
  create,
  update,
  finish,
};
