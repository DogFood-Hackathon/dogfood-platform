import React from "react";
// import "../../css/rulesEligibility.css";

function RulesEligibility() {
  return (
    <div className="event-form">
      <div className="form-heading">
        <span>04</span>
        <div>
          <h2>Rules & Eligibility</h2>
          <p>Define rules and submission requirements.</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field full-width">
          <label>Rules & Guidelines</label>
          <textarea
            rows="7"
            placeholder="Enter the rules and guidelines for participants"
          ></textarea>
        </div>

        <div className="form-field full-width">
          <label>Submission Requirements</label>
          <textarea
            rows="7"
            placeholder="Describe what participants must submit"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default RulesEligibility;