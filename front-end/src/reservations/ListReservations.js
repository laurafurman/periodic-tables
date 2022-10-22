import React from "react";
import ReservationCancel from "./ReservationCancel";

function ListReservations({ reservations }) {
  const rows = reservations.map(
    (
      {
        reservation_id,
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
        status,
      },
      index
    ) => (
      <tr key={index}>
        <td>
          {first_name} {last_name}
        </td>
        <td>{people}</td>
        <td>{mobile_number}</td>
        <td>{reservation_time}</td>
        <td>{status}</td>
        <td>
          <a href={`/reservations/${reservation_id}/edit`}>Edit</a>
        </td>
        {status === "booked" ? (
          <td>
            <a href={`/reservations/${reservation_id}/seat`}>Seat</a>
          </td>
        ) : (
          <td></td>
        )}
        <td>
          <ReservationCancel reservation_id={reservation_id} />
        </td>
      </tr>
    )
  );
  if (reservations.length) {
    return (
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Party</th>
                <th>Phone</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
  return (
    <div>
      <p>There are no reservations on this date.</p>
    </div>
  );
}

export default ListReservations;
