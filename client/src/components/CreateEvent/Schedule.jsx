import React from "react";
// import "../../css/schedule.css";

function Schedule({ formData, setFormData }) {
  return (
    <div className="event-form">
      <div className="form-heading">
        <span>02</span>
        <div>
          <h2>Schedule</h2>
          <p>Set the important dates for your hackathon.</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>Registration Start Date</label>
          <input type="datetime-local" />
        </div>

        <div className="form-field">
          <label>
            Registration Deadline <span>*</span>
          </label>
          <input type="datetime-local" />
        </div>

        <div className="form-field">
          <label>
            Hackathon Start Date <span>*</span>
          </label>
          <input type="datetime-local" />
        </div>

        <div className="form-field">
          <label>
            Hackathon End Date <span>*</span>
          </label>
          <input type="datetime-local" />
        </div>

        <div className="form-field full-width">
          <label>
            Submission Deadline <span>*</span>
          </label>
          <input type="datetime-local" />
        </div>
      </div>
    </div>
  );
}

export default Schedule;