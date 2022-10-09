const validator = require("validator");
const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//List handler for reservation resources
async function list(req, res) {
  const { date } = req.query;
  if (date) {
    res.status(200).json({ data: await service.list(date) });
  }
}

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${req.params.reservationId} cannot be found.`,
  });
}

function read(req, res) {
  const { reservation: data } = res.locals;
  res.json({ data });
}

const regexDate =
  /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

const regexTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

function dateIsValid(req, res, next) {
  const data = req.body.data;
  let toTest = data.reservation_date;
  if (!regexDate.test(toTest)) {
    next({
      status: 400,
      message: `reservation_date must be a date`,
    });
  }
  next();
}

function timeIsValid(req, res, next) {
  const data = req.body.data;
  console.log(data.reservation_time);
  let toTest = data.reservation_time;
  if (!regexTime.test(toTest)) {
    next({
      status: 400,
      message: `reservation_time must be a time`,
    });
  }
  next();
}

function peopleIsValid(req, res, next) {
  const data = req.body.data;
  let toTest = data.people;
  if (typeof toTest !== "number") {
    next({
      status: 400,
      message: `people must be a number`,
    });
  }
  next();
}

async function create(req, res) {
  // console.log(req.body.data);
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    hasRequiredProperties,
    dateIsValid,
    timeIsValid,
    peopleIsValid,
    asyncErrorBoundary(create),
  ],
};
