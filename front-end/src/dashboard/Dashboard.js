import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import useQuery from "../utils/useQuery";
import { previous, next, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "../reservations/ListReservations";
import ListTables from "../tables/ListTables";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [resError, setResError] = useState(null);
  const [dateState, setDateState] = useState(date);

  const history = useHistory();
  const route = useRouteMatch();
  const query = useQuery();

  useEffect(loadDashboard, [dateState]);

  function loadDashboard() {
    const abortController = new AbortController();
    setResError(null);
    listReservations({ date: dateState }, abortController.signal)
      .then(setReservations)
      .catch(setResError);
    return () => abortController.abort();
  }

  useEffect(() => {
    const abortController = new AbortController();
    setResError(null);
    listTables(abortController.signal).then(setTables).catch(setResError);
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    function getDate() {
      const queryDate = query.get("date");
      if (queryDate) {
        setDateState(queryDate);
      } else {
        setDateState(today());
      }
    }
    getDate();
  }, [query, route]);

  return (
    <main>
      <div>
        <h1>Dashboard</h1>
        <div>
          <button
            onClick={() => {
              history.push(`/dashboard?date=${previous(date)}`);
              setDateState(previous(date));
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              history.push(`/dashboard?date=${next(date)}`);
              setDateState(next(date));
            }}
          >
            Next
          </button>
          <button
            onClick={() => {
              history.push(`/dashboard?date=${today()}`);
              setDateState(today());
            }}
          >
            Today
          </button>
        </div>
        <div>
          <h4 className="mb-0">Reservations for {dateState}</h4>
          <ErrorAlert error={resError} />
          <div className="d-md-flex mb-3">
            <ListReservations
              reservations={reservations}
              // changeDateHandler={changeDateHandler}
            />
          </div>
        </div>
        <div>
          <h4>Tables</h4>
          <ListTables tables={tables} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
