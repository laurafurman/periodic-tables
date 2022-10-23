import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "../reservations/ListReservations";

function Search() {
  const initialFormState = { mobile_number: "" };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [err, setErr] = useState(null);
  const [reservations, setReservations] = useState([]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    setErr(null);
    try {
      const response = await listReservations(formData, abortController.signal);
      setReservations(response);
      setFormData({ ...initialFormState });
    } catch (error) {
      setErr(error);
    }
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Search Reservations</h1>
      <ErrorAlert error={err} />
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="mobile_number">Mobile Number:</label>
            <input
              type="text"
              id="mobile_number"
              name="mobile_number"
              placeholder="Enter a Customer's Phone Number"
              className="form-control"
              onChange={handleChange}
              value={formData.mobile_number}
              required
            />
          </div>
          <button type="submit">Find</button>
        </form>
      </div>
      <div>
        {reservations.length > 0 ? (
          <div>
            <h3>Search Results</h3>
            <ListReservations reservations={reservations} />
          </div>
        ) : (
          <p>No reservations found</p>
        )}
      </div>
    </main>
  );
}

export default Search;
