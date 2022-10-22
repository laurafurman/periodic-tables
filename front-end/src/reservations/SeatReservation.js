import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, seatTable } from "../utils/api";

function SeatReservation() {
  const initialFormState = { table_id: "" };

  const { reservation_id } = useParams();

  const [tables, setTables] = useState([]);
  const [tableError, setTableError] = useState(null);
  const [formData, setFormData] = useState({ ...initialFormState });

  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    setTableError(null);
    listTables(abortController.signal).then(setTables).catch(setTableError);
    return () => abortController.abort();
  }, [reservation_id]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setTableError(false);
    const abortController = new AbortController();
    const tableId = Number(formData.table_id);
    const reservationId = Number(reservation_id);
    try {
      await seatTable(tableId, reservationId, abortController.signal);
      history.push(`/dashboard`);
    } catch (error) {
      setTableError(error);
    }
    return () => abortController.abort();
  }

  return (
    <div>
      <h2>Seat Reservation</h2>
      <ErrorAlert error={tableError} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_id">
          Select Table:
          <select
            id="table_id"
            name="table_id"
            onChange={handleChange}
            value={formData.table_id}
          >
            <option value="">-- Choose a table to seat --</option>
            {tables.map((table) => (
              <option key={table.table_id} value={table.table_id}>
                {table.table_name}: Capacity {table.capacity}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Seat</button>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default SeatReservation;
