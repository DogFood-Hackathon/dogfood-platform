import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import BasicDetails from "../components/CreateEvent/BasicDetails";
import Schedule from "../components/CreateEvent/Schedule";
import HackathonDetails from "../components/CreateEvent/HackathonDetails";
import RulesEligibility from "../components/CreateEvent/RulesEligibility";
import Contact from "../components/CreateEvent/Contact";
import SubmitEvent from "../components/CreateEvent/SubmitEvent";
import "../css/CreateEvent.css";

function CreateEvent() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    hackathonName: "",
    shortDescription: "",
    detailedDescription: "",
    organizationName: "",
    organizationEmail: "",
    organizationWebsite: "",
    registrationStart: "",
    registrationDeadline: "",
    hackathonStart: "",
    hackathonEnd: "",
    submissionDeadline: "",
    tracks: "",
    prizes: "",
    eligibility: "",
    minTeamSize: "",
    maxTeamSize: "",
    rules: "",
    submissionRequirements: "",
    contactPerson: "",
    contactEmail: "",
  });

  const steps = [
    {
      title: "Basic Details",
      subtitle: "Event information",
    },
    {
      title: "Schedule",
      subtitle: "Dates & deadlines",
    },
    {
      title: "Hackathon Details",
      subtitle: "Tracks, prizes & teams",
    },
    {
      title: "Rules & Eligibility",
      subtitle: "Rules & requirements",
    },
    {
      title: "Contact",
      subtitle: "Contact information",
    },
    {
      title: "Submit",
      subtitle: "Send for approval",
    },
  ];

  const updateFormData = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSaved(false);
  };

  const saveDraft = () => {
    localStorage.setItem(
      "dogfood-event-draft",
      JSON.stringify(formData)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const validateStep = () => {
    if (activeStep === 0) {
      if (!formData.hackathonName.trim()) {
        alert("Please enter the Hackathon Name.");
        return false;
      }

      if (!formData.shortDescription.trim()) {
        alert("Please enter the Short Description.");
        return false;
      }

      if (!formData.organizationName.trim()) {
        alert("Please enter the Organization / Host Name.");
        return false;
      }

      if (!formData.organizationEmail.trim()) {
        alert("Please enter the Organization Email.");
        return false;
      }
    }

    if (activeStep === 1) {
      if (!formData.registrationDeadline) {
        alert("Please enter the Registration Deadline.");
        return false;
      }

      if (!formData.hackathonStart) {
        alert("Please enter the Hackathon Start Date.");
        return false;
      }

      if (!formData.hackathonEnd) {
        alert("Please enter the Hackathon End Date.");
        return false;
      }

      if (!formData.submissionDeadline) {
        alert("Please enter the Submission Deadline.");
        return false;
      }
    }

    if (activeStep === 2) {
      if (!formData.tracks.trim()) {
        alert("Please enter at least one Track.");
        return false;
      }

      if (!formData.prizes.trim()) {
        alert("Please enter the Prizes.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }

    saveDraft();

    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleStepClick = (index) => {
    if (index <= activeStep) {
      setActiveStep(index);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <BasicDetails
            formData={formData}
            updateFormData={updateFormData}
          />
        );

      case 1:
        return (
          <Schedule
            formData={formData}
            updateFormData={updateFormData}
          />
        );

      case 2:
        return (
          <HackathonDetails
            formData={formData}
            updateFormData={updateFormData}
          />
        );

      case 3:
        return (
          <RulesEligibility
            formData={formData}
            updateFormData={updateFormData}
          />
        );

      case 4:
        return (
          <Contact
            formData={formData}
            updateFormData={updateFormData}
          />
        );

      case 5:
        return <SubmitEvent formData={formData} />;

      default:
        return null;
    }
  };

  return (
    <div className="create-event-page">
      <Navbar />

      <button
          className="back-home-button"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      <div className="create-event-header">
        

        <span className="create-event-label">ORGANIZER</span>
        <h1>Create an Event</h1>
        <p>Set up your hackathon and submit it for approval.</p>
      </div>

      <div className="create-event-container">
        <aside className="create-event-sidebar">
          <div className="sidebar-title">Event Setup</div>

          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`event-step ${
                activeStep === index ? "active" : ""
              } ${index > activeStep ? "locked" : ""}`}
              onClick={() => handleStepClick(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>

              <div>
                <strong>{step.title}</strong>
                <small>{step.subtitle}</small>
              </div>
            </div>
          ))}
        </aside>

        <main className="create-event-main">
          {renderStep()}

          <div className="create-event-navigation">
            <button
              className="back-button"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              ← Back
            </button>

            <div className="navigation-right">
              <button
                className="save-draft-button"
                onClick={saveDraft}
              >
                Save Draft
              </button>

              {activeStep < steps.length - 1 ? (
                <button
                  className="next-button"
                  onClick={handleNext}
                >
                  Save & Continue →
                </button>
              ) : (
                <button className="submit-button">
                  Submit for Approval
                </button>
              )}
            </div>
          </div>

          {saved && (
            <div className="draft-saved-message">
              Draft saved successfully
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default CreateEvent;