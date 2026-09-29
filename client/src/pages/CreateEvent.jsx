import React, { useEffect, useState } from "react";
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
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(0);

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

  useEffect(() => {
  const savedDraft = localStorage.getItem("dogfood-event-draft");

  if (savedDraft) {
    setFormData(JSON.parse(savedDraft));
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "dogfood-event-draft",
    JSON.stringify(formData)
  );
}, [formData]);

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
    if (!formData.registrationStart) {
      alert("Please enter the Registration Start Date.");
      return false;
    }

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

    if (formData.registrationDeadline <= formData.registrationStart) {
      alert("Registration Deadline must be after Registration Start Date.");
      return false;
    }

    if (formData.hackathonStart < formData.registrationDeadline) {
      alert("Hackathon Start Date must be on or after Registration Deadline.");
      return false;
    }

    if (formData.hackathonEnd <= formData.hackathonStart) {
      alert("Hackathon End Date must be after Hackathon Start Date.");
      return false;
    }

    if (formData.submissionDeadline < formData.hackathonEnd) {
      alert("Submission Deadline cannot be before Hackathon End Date.");
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
  if (activeStep > maxUnlockedStep) {
    alert("Please complete the previous steps first.");
    return;
  }

  if (!validateStep()) return;

  saveDraft();

  if (activeStep < steps.length - 1) {
    const nextStep = activeStep + 1;

    setMaxUnlockedStep((previous) =>
      Math.max(previous, nextStep)
    );

    setActiveStep(nextStep);
  }
};

const validateAllSteps = () => {
  if (!formData.hackathonName.trim()) {
    alert("Please complete Basic Details: Hackathon Name.");
    setActiveStep(0);
    return false;
  }

  if (!formData.shortDescription.trim()) {
    alert("Please complete Basic Details: Short Description.");
    setActiveStep(0);
    return false;
  }

  if (!formData.organizationName.trim()) {
    alert("Please complete Basic Details: Organization / Host Name.");
    setActiveStep(0);
    return false;
  }

  if (!formData.organizationEmail.trim()) {
    alert("Please complete Basic Details: Organization Email.");
    setActiveStep(0);
    return false;
  }

  if (!formData.registrationStart) {
    alert("Please complete Schedule: Registration Start Date.");
    setActiveStep(1);
    return false;
  }

  if (!formData.registrationDeadline) {
    alert("Please complete Schedule: Registration Deadline.");
    setActiveStep(1);
    return false;
  }

  if (!formData.hackathonStart) {
    alert("Please complete Schedule: Hackathon Start Date.");
    setActiveStep(1);
    return false;
  }

  if (!formData.hackathonEnd) {
    alert("Please complete Schedule: Hackathon End Date.");
    setActiveStep(1);
    return false;
  }

  if (!formData.submissionDeadline) {
    alert("Please complete Schedule: Submission Deadline.");
    setActiveStep(1);
    return false;
  }

  if (formData.registrationDeadline <= formData.registrationStart) {
    alert("Registration Deadline must be after Registration Start Date.");
    setActiveStep(1);
    return false;
  }

  if (formData.hackathonStart < formData.registrationDeadline) {
    alert("Hackathon Start Date must be on or after Registration Deadline.");
    setActiveStep(1);
    return false;
  }

  if (formData.hackathonEnd <= formData.hackathonStart) {
    alert("Hackathon End Date must be after Hackathon Start Date.");
    setActiveStep(1);
    return false;
  }

  if (formData.submissionDeadline < formData.hackathonEnd) {
    alert("Submission Deadline cannot be before Hackathon End Date.");
    setActiveStep(1);
    return false;
  }

  if (!formData.tracks.trim()) {
    alert("Please complete Hackathon Details: Tracks.");
    setActiveStep(2);
    return false;
  }

  if (!formData.prizes.trim()) {
    alert("Please complete Hackathon Details: Prizes.");
    setActiveStep(2);
    return false;
  }

  return true;
};


const submitEvent = () => {
  if (!validateAllSteps()) return;

  const newEvent = {
    id: Date.now(),
    ...formData,
    status: "pending_approval",
    submittedAt: new Date().toISOString(),
  };

  console.log("EVENT SUBMISSION PAYLOAD:");
  console.log(newEvent);

  console.log("JSON PAYLOAD:");
  console.log(JSON.stringify(newEvent, null, 2));

  const submittedEvents =
    JSON.parse(localStorage.getItem("dogfood-submitted-events")) || [];

  submittedEvents.push(newEvent);

  localStorage.setItem(
    "dogfood-submitted-events",
    JSON.stringify(submittedEvents)
  );

  localStorage.removeItem("dogfood-event-draft");

  alert("Event submitted successfully for admin approval.");
};

const handleEnterKey = (e) => {
  if (e.key !== "Enter") return;

  if (
    e.target.tagName !== "INPUT" &&
    e.target.tagName !== "TEXTAREA" &&
    e.target.tagName !== "SELECT"
  ) {
    return;
  }

  e.preventDefault();

  const fields = Array.from(
    e.currentTarget.querySelectorAll(
      "input:not([disabled]), textarea:not([disabled]), select:not([disabled])"
    )
  );

  const currentIndex = fields.indexOf(e.target);

  if (currentIndex === -1) return;

  if (currentIndex < fields.length - 1) {
    fields[currentIndex + 1].focus();
    return;
  }

  if (activeStep < steps.length - 1 && activeStep <= maxUnlockedStep) {
    const nextStep = activeStep + 1;

    setMaxUnlockedStep((previous) =>
      Math.max(previous, nextStep)
    );

    setActiveStep(nextStep);
  }
};

 
   

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleStepClick = (index) => {
  setActiveStep(index);
};



  const renderStep = () => {
  return (
    <fieldset
      className="event-step-fieldset"
      onKeyDown={handleEnterKey}
    >
      {(() => {
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
      })()}
    </fieldset>
  );
};

  return (
    <div className="create-event-page">
      

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
                <button
  className="submit-button"
  onClick={submitEvent}
>
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