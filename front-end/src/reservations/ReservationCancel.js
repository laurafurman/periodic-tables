import React, { useState } from "react";
import { cancelReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationCancel({ reservation_id }) {
  const [err, setErr] = useState(null);

  async function handleCancel(event) {
    event.preventDefault();
    let abortController = new AbortController();
    setErr(null);
    let confirmCancel = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (confirmCancel) {
      try {
        await cancelReservation(reservation_id, abortController.signal);
        window.location.reload(true);
      } catch (error) {
        setErr(error);
      }
    }
    return () => abortController.abort();
  }

  return (
    <>
      <ErrorAlert error={err} />
      <button
        type="button"
        className="btn btn-danger btn-sm mx-2"
        onClick={handleCancel}
        data-reservation-id-cancel={reservation_id}
      >
        Cancel
      </button>
    </>
  );
}

export default ReservationCancel;
