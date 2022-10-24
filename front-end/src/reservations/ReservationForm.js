import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ handleChange, handleSubmit, formData }) {
  const history = useHistory();

  return (
    <div className="container">
      <div className="col-lg-6">
        <form onSubmit={handleSubmit}>
          {/* <div className="form-row"> */}
          <div className="form-group row my-2">
            <label htmlFor="first_name">
              First Name
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="form-control"
                onChange={handleChange}
                value={formData.first_name || ""}
              />
            </label>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="last_name">
              Last Name
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="form-control"
                onChange={handleChange}
                value={formData.last_name || ""}
              />
            </label>
          </div>
          {/* </div> */}
          <div className="form-group row my-2">
            <label htmlFor="mobile_number">
              Phone Number
              <input
                type="text"
                id="mobile_number"
                name="mobile_number"
                className="form-control"
                onChange={handleChange}
                value={formData.mobile_number || ""}
              />
            </label>
          </div>

          <div className="form-group row my-2">
            <label htmlFor="reservation_date">
              Date
              <input
                type="text"
                id="reservation_date"
                name="reservation_date"
                className="form-control"
                onChange={handleChange}
                value={formData.reservation_date || ""}
              />
            </label>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="reservation_time">
              Time
              <input
                type="text"
                id="reservation_time"
                name="reservation_time"
                className="form-control"
                onChange={handleChange}
                value={formData.reservation_time || ""}
              />
            </label>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="people">
              Party Size
              <input
                type="text"
                id="people"
                name="people"
                className="form-control"
                onChange={handleChange}
                value={formData.people || ""}
              />
            </label>
          </div>

          <div>
            <button type="submit" className="btn btn-primary my-2">
              Submit
            </button>

            <button
              type="button"
              className="btn btn-secondary mx-2"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;
