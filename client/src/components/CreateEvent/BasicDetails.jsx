import React from "react";

function BasicDetails({ formData, updateFormData }) {
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
            value={formData.hackathonName}
            onChange={(e) =>
              updateFormData("hackathonName", e.target.value)
            }
          />
        </div>

        <div className="form-field full-width">
          <label>
            Short Description <span>*</span>
          </label>
          <input
            type="text"
            placeholder="A short description of your hackathon"
            value={formData.shortDescription}
            onChange={(e) =>
              updateFormData("shortDescription", e.target.value)
            }
          />
        </div>

        <div className="form-field full-width">
          <label>Detailed Description</label>
          <textarea
            rows="5"
            placeholder="Describe your hackathon and what participants can expect"
            value={formData.detailedDescription}
            onChange={(e) =>
              updateFormData("detailedDescription", e.target.value)
            }
          ></textarea>
        </div>

        <div className="form-field">
          <label>
            Organization / Host Name <span>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. ABC Coding Club"
            value={formData.organizationName}
            onChange={(e) =>
              updateFormData("organizationName", e.target.value)
            }
          />
        </div>

        <div className="form-field">
          <label>
            Organization Email <span>*</span>
          </label>
          <input
            type="email"
            placeholder="contact@example.com"
            value={formData.organizationEmail}
            onChange={(e) =>
              updateFormData("organizationEmail", e.target.value)
            }
          />
        </div>

        <div className="form-field full-width">
          <label>Organization Website</label>
          <input
            type="url"
            placeholder="https://example.com"
            value={formData.organizationWebsite}
            onChange={(e) =>
              updateFormData("organizationWebsite", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default BasicDetails;