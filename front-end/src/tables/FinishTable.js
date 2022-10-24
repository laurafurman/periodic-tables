import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function FinishTable({ table }) {
  const [err, setErr] = useState(null);

  const history = useHistory();

  async function handleClick(event) {
    event.preventDefault();
    const abortController = new AbortController();
    setErr(null);
    let confirmFinish = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (confirmFinish) {
      try {
        await finishTable(
          table.table_id,
          table.reservation_id,
          abortController.signal
        );
        history.push("/");
      } catch (error) {
        setErr(error);
      }
      return () => abortController.abort();
    }
  }

  /**
   * Renders finish button and updates status from "Free" to "Occupied"
   */

  return (
    <div className="row">
      <div className="col">
        <p className="text-danger" data-table-id-status={table.table_id}>
          Occupied
        </p>
      </div>
      <ErrorAlert error={err} />
      <div className="col">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          data-table-id-finish={table.table_id}
          onClick={handleClick}
        >
          Finish
        </button>
      </div>
    </div>
  );
}

export default FinishTable;
