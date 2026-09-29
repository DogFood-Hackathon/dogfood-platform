import React from "react";

function Schedule({ formData, updateFormData }) {
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
          <input
            type="datetime-local"
            value={formData.registrationStart}
            onChange={(e) =>
              updateFormData("registrationStart", e.target.value)
            }
          />
        </div>

        <div className="form-field">
          <label>
            Registration Deadline <span>*</span>
          </label>
          <input
            type="datetime-local"
            value={formData.registrationDeadline}
            min={formData.registrationStart || undefined}
            onChange={(e) =>
              updateFormData("registrationDeadline", e.target.value)
            }
          />
        </div>

        <div className="form-field">
          <label>
            Hackathon Start Date <span>*</span>
          </label>
          <input
            type="datetime-local"
            value={formData.hackathonStart}
            min={formData.registrationDeadline || undefined}
            onChange={(e) =>
              updateFormData("hackathonStart", e.target.value)
            }
          />
        </div>

        <div className="form-field">
          <label>
            Hackathon End Date <span>*</span>
          </label>
          <input
            type="datetime-local"
            value={formData.hackathonEnd}
            min={formData.hackathonStart || undefined}
            onChange={(e) =>
              updateFormData("hackathonEnd", e.target.value)
            }
          />
        </div>

        <div className="form-field full-width">
          <label>
            Submission Deadline <span>*</span>
          </label>
          <input
            type="datetime-local"
            value={formData.submissionDeadline}
            min={formData.hackathonEnd || undefined}
            onChange={(e) =>
              updateFormData("submissionDeadline", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Schedule;