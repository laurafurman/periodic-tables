import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./TableForm";

function TableAdd() {
  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [err, setErr] = useState(null);

  const history = useHistory();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    setErr(null);
    formData.capacity = Number(formData.capacity);
    try {
      await createTable(formData, abortController.signal);
      history.push(`/dashboard`);
    } catch (error) {
      setErr(error);
    }
    return () => abortController.abort();
  }

  return (
    <div className="m-3">
      <h2 className="m-2">Add New Table</h2>
      <ErrorAlert error={err} />
      <TableForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    </div>
  );
}

export default TableAdd;
