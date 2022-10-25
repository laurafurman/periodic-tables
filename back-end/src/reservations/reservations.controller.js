const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//List handler for reservation resources
async function list(req, res) {
  const { date, mobile_number } = req.query;
  if (date) {
    const data = await service.list(date);
    res.json({ data });
  }
  if (mobile_number) {
    const data = await service.search(mobile_number);
    res.json({ data });
  }
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  console.log(data);
  res.status(201).json({ data });
}

function read(req, res) {
  const data = res.locals.reservation;
  res.json({ data });
}

async function updateStatus(req, res) {
  const { status } = req.body.data;
  const { reservation_id } = res.locals.reservation;
  const updatedReservation = {
    reservation_id: reservation_id,
    status: status,
  };
  const data = await service.update(updatedReservation);
  res.json({ data });
}

async function updateReservation(req, res) {
  const data = await service.updateReservation(req.body.data);
  res.json({ data });
}

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

const regexDate =
  /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

const regexTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

function dateIsValid(req, res, next) {
  const toTest = req.body.data.reservation_date.slice(0, 10);
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
  const toTest = req.body.data.people;
  if (typeof toTest !== "number") {
    next({
      status: 400,
      message: `people must be a number`,
    });
  }
  next();
}

function dateIsNotPast(req, res, next) {
  const reservationDate = req.body.data.reservation_date;
  const today = new Date().toJSON().slice(0, 10);
  if (reservationDate >= today) {
    next();
  } else {
    next({
      status: 400,
      message: `Please choose a time in the future.`,
    });
  }
}
function timeIsFuture(req, res, next) {
  const resDate = req.body.data.reservation_date;
  let resTime = req.body.data.reservation_time;
  const today = new Date();
  const resRequest = `${resDate} ${resTime}`;
  // const todayDate = today.toJSON().slice(0, 10);
  // const todayTime = today.toJSON().slice(11, 16);
  // toTest = toTest.replace(/:/g, "");
  // if (resDate === todayDate) {
  if (today > resRequest) {
    next({
      status: 400,
      message: `Reservation must be in the future.`,
    });
  } else {
    next();
  }
  // }
}

function dateIsNotTuesday(req, res, next) {
  const reservationDate = req.body.data.reservation_date.slice(0, 10);
  const date = new Date(reservationDate);
  const toTest = date.getDay();
  if (toTest === 2) {
    next({
      status: 400,
      message: `We're closed on Tuesday. Please choose a different day.`,
    });
  }
  next();
}

function timeIsOpen(req, res, next) {
  const data = req.body.data;
  let toTest = data.reservation_time;
  // toTest = toTest.replace(/:/g, "");
  if (toTest >= "10:30" && toTest <= "21:30") {
    next();
  } else {
    next({
      status: 400,
      message: `Reservation must be between 10:30 AM and 9:30 PM`,
    });
  }
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  });
}

function statusBooked(req, res, next) {
  const { status } = req.body.data;
  if (status && status !== "booked") {
    next({
      status: 400,
      message: `Cannot create reservations under ${status} status`,
    });
  }
  next();
}

function statusNotFinished(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "finished") {
    next({
      status: 400,
      message: `Cannot update reservation that is finished.`,
    });
  }
  next();
}

function statusIsValid(req, res, next) {
  const { status } = req.body.data;
  if (
    status !== "booked" &&
    status !== "seated" &&
    status !== "finished" &&
    status !== "cancelled"
  ) {
    next({
      status: 400,
      message: `Cannot make reservations with unknown status`,
    });
  }
  next();
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    hasRequiredProperties,
    dateIsValid,
    timeIsValid,
    peopleIsValid,
    dateIsNotPast,
    dateIsNotTuesday,
    timeIsFuture,
    timeIsOpen,
    statusBooked,
    asyncErrorBoundary(create),
  ],
  // reservationExists: [asyncErrorBoundary(reservationExists)],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    statusIsValid,
    statusNotFinished,
    asyncErrorBoundary(updateStatus),
  ],
  updateReservation: [
    asyncErrorBoundary(reservationExists),
    hasRequiredProperties,
    dateIsValid,
    timeIsValid,
    peopleIsValid,
    dateIsNotPast,
    timeIsFuture,
    timeIsOpen,
    dateIsNotTuesday,
    statusBooked,
    asyncErrorBoundary(updateReservation),
  ],
};
