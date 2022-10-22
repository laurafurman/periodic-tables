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
      "Are you sure you want to cancel this reservation? This cannot be undone."
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
    <div>
      <ErrorAlert error={err} />
      <button
        type="button"
        onClick={handleCancel}
        data-reservation-id-cancel={reservation_id}
      >
        Cancel
      </button>
    </div>
  );
}

export default ReservationCancel;
