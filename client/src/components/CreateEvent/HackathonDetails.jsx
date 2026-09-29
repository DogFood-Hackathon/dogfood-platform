import React from "react";

function HackathonDetails({ formData, updateFormData }) {
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
            value={formData.tracks}
            onChange={(e) =>
              updateFormData("tracks", e.target.value)
            }
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
            value={formData.prizes}
            onChange={(e) =>
              updateFormData("prizes", e.target.value)
            }
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
            value={formData.eligibility}
            onChange={(e) =>
              updateFormData("eligibility", e.target.value)
            }
          ></textarea>
        </div>

        <div className="form-field">
          <label>Minimum Team Size</label>
          <input
            type="number"
            min="1"
            placeholder="1"
            value={formData.minTeamSize}
            onChange={(e) =>
              updateFormData("minTeamSize", e.target.value)
            }
          />
        </div>

        <div className="form-field">
          <label>Maximum Team Size</label>
          <input
            type="number"
            min="1"
            placeholder="4"
            value={formData.maxTeamSize}
            onChange={(e) =>
              updateFormData("maxTeamSize", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default HackathonDetails;