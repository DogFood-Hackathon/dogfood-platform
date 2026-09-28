import React from "react";
// import "../../css/contact.css";

function Contact() {
  return (
    <div className="event-form">
      <div className="form-heading">
        <span>05</span>
        <div>
          <h2>Contact</h2>
          <p>Provide contact information for participants.</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field full-width">
          <label>Contact Person</label>
          <input
            type="text"
            placeholder="e.g. Event Coordinator"
          />
        </div>

        <div className="form-field full-width">
          <label>Contact Email</label>
          <input
            type="email"
            placeholder="contact@example.com"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;