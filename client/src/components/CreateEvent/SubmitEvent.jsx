import React from "react";
// import "../../css/submitEvent.css";

function SubmitEvent() {
  return (
    <div className="submit-form">
      <div className="submit-icon">✓</div>

      <h2>Ready to Submit?</h2>

      <p>
        Review your event information before sending it for
        admin approval.
      </p>

      <div className="approval-box">
        <span>STATUS</span>
        <strong>Pending Admin Approval</strong>
      </div>
    </div>
  );
}

export default SubmitEvent;