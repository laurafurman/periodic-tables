import React from "react";
import { useHistory } from "react-router-dom";

function TableForm({ handleChange, handleSubmit, formData }) {
  const history = useHistory();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_name">
          Table Name:
          <input
            type="text"
            id="table_name"
            name="table_name"
            class="form-control"
            onChange={handleChange}
            value={formData.table_name}
          />
        </label>
        <label htmlFor="capacity">
          Capacity:
          <input
            type="text"
            id="capacity"
            name="capacity"
            class="form-control"
            onChange={handleChange}
            value={formData.capacity}
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default TableForm;
