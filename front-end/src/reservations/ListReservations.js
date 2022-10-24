import React from "react";
import ReservationCancel from "./ReservationCancel";

/**
 * Renders list of individual reservation cards or alert with error
 */
function ListReservations({ reservations }) {
  const rows = reservations.map(
    ({
      reservation_id,
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
      status,
    }) => (
      <div className="card my-2" key={reservation_id}>
        <div className="card-header">
          <h5>
            {first_name} {last_name}: Party of {people}
          </h5>
        </div>
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <p>{mobile_number.replace("-", "").replace("-", "")}</p>
                    </div>
                    <div className="col">
                      <p>{reservation_time}</p>
                    </div>
                    <div className="col">
                      <p
                        className="text-capitalize"
                        data-reservation-id-status={reservation_id}
                      >
                        {status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <p className="">
                  <a
                    href={`/reservations/${reservation_id}/edit`}
                    className="btn btn-primary btn-sm mx-2"
                  >
                    Edit
                  </a>
                  {status === "booked" ? (
                    <a
                      href={`/reservations/${reservation_id}/seat`}
                      className="btn btn-success btn-sm mx-2"
                    >
                      Seat
                    </a>
                  ) : (
                    <> </>
                  )}
                  <ReservationCancel reservation_id={reservation_id} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
  if (reservations.length) {
    return (
      <div className="card-deck">
        <div>{rows}</div>
      </div>
    );
  }
  return (
    <div>
      <p className="alert alert-secondary">
        There are no reservations on this date.
      </p>
    </div>
  );
}

export default ListReservations;
