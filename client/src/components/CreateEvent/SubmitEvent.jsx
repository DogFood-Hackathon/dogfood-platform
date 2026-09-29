import React from "react";

function SubmitEvent({ formData }) {
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

      <div className="submit-summary">
        <div>
          <span>Hackathon</span>
          <strong>{formData.hackathonName || "Not provided"}</strong>
        </div>

        <div>
          <span>Organization</span>
          <strong>{formData.organizationName || "Not provided"}</strong>
        </div>

        <div>
          <span>Tracks</span>
          <strong>{formData.tracks || "Not provided"}</strong>
        </div>

        <div>
          <span>Prizes</span>
          <strong>{formData.prizes || "Not provided"}</strong>
        </div>
      </div>
    </div>
  );
}

export default SubmitEvent;