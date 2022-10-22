import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ handleChange, handleSubmit, formData }) {
  const history = useHistory();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">
          First Name:
          <input
            type="text"
            id="first_name"
            name="first_name"
            class="form-control"
            onChange={handleChange}
            value={formData.first_name}
          />
        </label>
        <label htmlFor="last_name">
          Last Name:
          <input
            type="text"
            id="last_name"
            name="last_name"
            class="form-control"
            onChange={handleChange}
            value={formData.last_name}
          />
        </label>
        <label htmlFor="mobile_number">
          Phone Number:
          <input
            type="text"
            id="mobile_number"
            name="mobile_number"
            class="form-control"
            onChange={handleChange}
            value={formData.mobile_number}
          />
        </label>
        <label htmlFor="reservation_date">
          Date:
          <input
            type="date"
            id="reservation_date"
            name="reservation_date"
            class="form-control"
            onChange={handleChange}
            value={formData.reservation_date}
          />
        </label>
        <label htmlFor="reservation_time">
          Time:
          <input
            type="time"
            id="reservation_time"
            name="reservation_time"
            class="form-control"
            onChange={handleChange}
            value={formData.reservation_time}
          />
        </label>
        <label htmlFor="people">
          Party Size:
          <input
            type="text"
            id="people"
            name="people"
            class="form-control"
            onChange={handleChange}
            value={formData.people}
          />
        </label>
        <div>
          <button type="submit" className="btn btn-danger">
            Submit
          </button>
          <button type="button" onClick={() => history.goBack()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
