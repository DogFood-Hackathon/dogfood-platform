import React from "react";
// import "../../css/basicDetails.css";

function BasicDetails() {
  return (
    <div className="event-form">
      <div className="form-heading">
        <span>01</span>
        <div>
          <h2>Basic Details</h2>
          <p>Tell us about your hackathon.</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field full-width">
          <label>Hackathon Name</label>
          <input
            type="text"
            placeholder="e.g. HackFest 2026"
          />
        </div>

        <div className="form-field full-width">
          <label>
            Short Description <span>*</span>
          </label>
          <input
            type="text"
            placeholder="A short description of your hackathon"
          />
        </div>

        <div className="form-field full-width">
          <label>Detailed Description</label>
          <textarea
            rows="5"
            placeholder="Describe your hackathon and what participants can expect"
          ></textarea>
        </div>

        <div className="form-field">
          <label>
            Organization / Host Name <span>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. ABC Coding Club"
          />
        </div>

        <div className="form-field">
          <label>
            Organization Email <span>*</span>
          </label>
          <input
            type="email"
            placeholder="contact@example.com"
          />
        </div>

        <div className="form-field full-width">
          <label>Organization Website</label>
          <input
            type="url"
            placeholder="https://example.com"
          />
        </div>
      </div>
    </div>
  );
}

export default BasicDetails;