import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ReservationForm() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:5001/reservations`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const savedData = await response.json();
    console.log(`Saved reservation!`, savedData);
  }

  const history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="first_name">
        First Name:
        <input
          type="text"
          id="first_name"
          name="first_name"
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
          onChange={handleChange}
          value={formData.people}
        />
      </label>
      <button type="submit">Submit</button>
      <button type="button" onClick={() => history.goBack()}>
        Cancel
      </button>
    </form>
  );
}

export default ReservationForm;
