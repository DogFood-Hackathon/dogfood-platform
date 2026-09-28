import React from "react";
// import "../../css/hackathonDetails.css";

function HackathonDetails() {
  return (
    <div className="event-form">
      <div className="form-heading">
        <span>03</span>
        <div>
          <h2>Hackathon Details</h2>
          <p>Configure tracks, prizes and team size.</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field full-width">
          <label>
            Tracks <span>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. AI, Web3, FinTech"
          />
          <small className="field-hint">
            Add multiple tracks for your hackathon.
          </small>
        </div>

        <div className="form-field full-width">
          <label>
            Prizes <span>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 1st Prize - ₹50,000"
          />
          <small className="field-hint">
            Add prizes such as 1st, 2nd and 3rd.
          </small>
        </div>

        <div className="form-field full-width">
          <label>Eligibility</label>
          <textarea
            rows="4"
            placeholder="Describe who can participate"
          ></textarea>
        </div>

        <div className="form-field">
          <label>Minimum Team Size</label>
          <input
            type="number"
            min="1"
            placeholder="1"
          />
        </div>

        <div className="form-field">
          <label>Maximum Team Size</label>
          <input
            type="number"
            min="1"
            placeholder="4"
          />
        </div>
      </div>
    </div>
  );
}

export default HackathonDetails;