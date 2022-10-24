const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// CRUDL FUNCTIONS
async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

async function create(req, res, next) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

function read(req, res, next) {
  const data = res.locals.table;
  res.json({ data });
}

async function update(req, res, next) {
  const updatedTable = {
    table_id: res.locals.table.table_id,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await tablesService.update(updatedTable);
  res.json({ data });
}

async function finish(req, res, next) {
  const { table } = res.locals;
  const data = await tablesService.finish(table);
  res.json({ data });
}

// VALIDATIONS

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await tablesService.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table ${table_id} cannot be found.`,
  });
}

const hasRequiredProperties = hasProperties("table_name", "capacity");

function capacityIsValid(req, res, next) {
  const { capacity } = req.body.data;
  if (!Number.isInteger(capacity)) {
    next({
      status: 400,
      message: `capacity must be a number.`,
    });
  }
  next();
}

function nameIsValid(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name.length < 2) {
    next({
      status: 400,
      message: `table_name must be at least 2 characters.`,
    });
  }
  next();
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  });
}

// Capacity of table is enough to accomodate party size
function capacityIsSufficient(req, res, next) {
  const { people } = res.locals.reservation;
  const { capacity } = res.locals.table;
  if (people > capacity) {
    next({
      status: 400,
      message: `This table does not have sufficient capacity. Please choose a different table.`,
    });
  }
  next();
}

function tableIsOccupied(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (reservation_id) {
    next({
      status: 400,
      message: `This table is occupied.`,
    });
  }
  next();
}

function tableIsUnoccupied(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (!reservation_id) {
    next({
      status: 400,
      message: `This table is not occupied.`,
    });
  }
  next();
}

function requestIsValid(req, res, next) {
  const { data } = req.body;
  if (!data) {
    return next({
      status: 400,
      message: `Request requires body.`,
    });
  }
  if (!data.reservation_id) {
    return next({
      status: 400,
      message: `Request requires reservation_id property.`,
    });
  }
  next();
}

function statusIsSeated(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "seated") {
    next({
      status: 400,
      message: `This reservation has already been seated.`,
    });
  }
  next();
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(tableExists), read],
  create: [
    hasRequiredProperties,
    capacityIsValid,
    nameIsValid,
    asyncErrorBoundary(create),
  ],
  update: [
    requestIsValid,
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationExists),
    capacityIsSufficient,
    tableIsOccupied,
    statusIsSeated,
    asyncErrorBoundary(update),
  ],
  finish: [
    asyncErrorBoundary(tableExists),
    tableIsUnoccupied,
    asyncErrorBoundary(finish),
  ],
};
