import React from "react";
import { useHistory } from "react-router-dom";

function TableForm({ handleChange, handleSubmit, formData }) {
  const history = useHistory();

  return (
    <div className="container">
      <div className="col-lg-6">
        <form onSubmit={handleSubmit}>
          <div className="form-group row my-2">
            <label htmlFor="table_name">
              Table Name
              <input
                type="text"
                id="table_name"
                name="table_name"
                className="form-control"
                onChange={handleChange}
                value={formData.table_name}
              />
            </label>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="capacity">
              Capacity
              <input
                type="text"
                id="capacity"
                name="capacity"
                className="form-control"
                onChange={handleChange}
                value={formData.capacity}
              />
            </label>
          </div>
          <button className="btn btn-primary my-2" type="submit">
            Submit
          </button>
          <button
            className="btn btn-secondary mx-2"
            type="button"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default TableForm;
