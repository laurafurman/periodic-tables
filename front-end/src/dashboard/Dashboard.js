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

  /**
   * Renders dashboard including date navigation, reservations for date, and tables
   */

  return (
    <main>
      <div>
        <div className="mt-3 mx-2">
          <button
            className="btn btn-secondary mx-1"
            onClick={() => {
              history.push(`/dashboard?date=${previous(dateState)}`);
              setDateState(previous(date));
            }}
          >
            Previous
          </button>
          <button
            className="btn btn-primary mx-1"
            onClick={() => {
              history.push(`/dashboard?date=${today()}`);
              setDateState(today());
            }}
          >
            Today
          </button>
          <button
            className="btn btn-secondary mx-1"
            onClick={() => {
              history.push(`/dashboard?date=${next(dateState)}`);
              setDateState(next(date));
            }}
          >
            Next
          </button>
        </div>
        <div className="container">
          <div className="row">
            <div className="col mt-3">
              <h4>Reservations for {dateState.slice(0, 10)}</h4>
              <ErrorAlert error={resError} />
              <div>
                <ListReservations reservations={reservations} />
              </div>
            </div>
            <div className="col mt-3">
              <h4>Tables</h4>
              <ListTables tables={tables} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
