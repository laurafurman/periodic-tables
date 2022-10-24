import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function ReservationAdd() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [resError, setResError] = useState(null);

  const history = useHistory();

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let abortController = new AbortController();
    setResError(null);
    try {
      const response = await createReservation(
        formData,
        abortController.signal
      );
      history.push(`/dashboard?date=${response.reservation_date.slice(0, 10)}`);
    } catch (error) {
      setResError(error);
    }
    return () => abortController.abort();
  }

  /**
   * Renders empty reservation form
   */

  return (
    <div className="m-3">
      <h2 className="m-2">New Reservation</h2>
      <ErrorAlert error={resError} />
      <ReservationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
      />
    </div>
  );
}

export default ReservationAdd;
