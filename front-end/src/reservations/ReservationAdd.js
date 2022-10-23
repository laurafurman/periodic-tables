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
    people: "",
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
      history.push(`/dashboard?date=${response.reservation_date}`);
    } catch (error) {
      setResError(error);
    }
    return () => abortController.abort();
  }

  return (
    <div>
      <h1>New Reservation</h1>
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
