import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function ReservationEdit() {
  const { reservation_id } = useParams();

  const [reservation, setReservation] = useState({});
  const [resError, setResError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    async function getReservation() {
      const response = await readReservation(reservation_id);
      setReservation(response);
    }
    getReservation();
  }, [reservation_id]);

  function handleChange(event) {
    setReservation({
      ...reservation,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    setResError(null);
    try {
      const response = await updateReservation(
        reservation,
        abortController.signal
      );
      history.push(`/dashboard?date=${response.reservation_date}`);
    } catch (error) {
      setResError(error);
    }
    return () => abortController.abort();
  }

  // let reservationDate = reservation.reservation_date;
  // reservationDate = reservationDate.splice(0, 10);

  return (
    <div>
      <h1>Edit Reservation</h1>
      <ErrorAlert error={resError} />
      <h1>{reservation.reservation_date}</h1>
      <ReservationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={reservation}
      />
    </div>
  );
}

export default ReservationEdit;
