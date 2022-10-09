import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const rows = reservations.map(
    (
      {
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
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
      </tr>
    )
  );

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Party</th>
                <th>Phone</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
        <div>
          <button onClick={() => alert("Previous")}>Previous</button>
          <button onClick={() => alert("Next")}>Next</button>
          <button onClick={() => alert("Today")}>Today</button>
        </div>
      </div>
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
