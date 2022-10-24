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
      <div className="m-3">
        <h2 className="my-3">Search Reservations</h2>
        <ErrorAlert error={err} />
        <div className="container ">
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              {/* <label className="col-2  col-form-label " htmlFor="mobile_number">
                Mobile Number
              </label> */}
              <div className="col-9">
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
              <button className="col-2 btn btn-primary mx-1" type="submit">
                Find
              </button>
            </div>
          </form>
        </div>
        <div>
          {reservations.length > 0 ? (
            <div className=" mx-2 my-3">
              <ListReservations reservations={reservations} />
            </div>
          ) : (
            <p className="alert alert-secondary my-4 mx-2">
              No reservations found
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Search;
