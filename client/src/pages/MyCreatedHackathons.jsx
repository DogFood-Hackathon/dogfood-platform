import React, { useState } from "react";
import "../css/MyCreatedHackathons.css";

function MyCreatedHackathons() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "HackFest 2026",
      organization: "ABC Coding Club",
      status: "Approved",
      dates: "12 Oct 2026 – 14 Oct 2026",
      participants: 320,
      teams: 82,
      submissions: 0
    },
    {
      id: 2,
      name: "TechSprint 2026",
      organization: "ABC Coding Club",
      status: "Pending Approval",
      dates: "25 Oct 2026 – 27 Oct 2026",
      participants: 0,
      teams: 0,
      submissions: 0
    },
    {
      id: 3,
      name: "CodeStorm 2026",
      organization: "ABC Coding Club",
      status: "Changes Required",
      dates: "5 Nov 2026 – 7 Nov 2026",
      participants: 0,
      teams: 0,
      submissions: 0
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const deleteEvent = (event) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.name}"?`
    );

    if (!confirmed) return;

    setEvents((previous) =>
      previous.filter((item) => item.id !== event.id)
    );
  };

  const handleManage = (event) => {
    window.location.href = `/organizer/events/${event.id}`;
  };

  const handleEdit = (event) => {
    window.location.href = `/create-event?edit=${event.id}`;
  };

  return (
    <div className="my-hackathons-page">
      <div className="my-hackathons-header">
        <div>
          <h1>My Created Hackathons</h1>
          <p>Manage the hackathons you organize.</p>
        </div>

        <button
          className="my-hackathons-create-btn"
          onClick={() => {
            window.location.href = "/create-event";
          }}
        >
          + Create Hackathon
        </button>
      </div>

      <div className="my-hackathons-list">
        {events.map((event) => (
          <div
            className="my-hackathon-card"
            key={event.id}
          >
            <div className="my-hackathon-card-header">
              <div>
                <h2>{event.name}</h2>
                <p>{event.organization}</p>
              </div>

              <span
                className={`my-hackathon-status ${event.status
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
              >
                {event.status}
              </span>
            </div>

            <div className="my-hackathon-date">
              <span>Hackathon Dates</span>
              <strong>{event.dates}</strong>
            </div>

            {event.status === "Approved" && (
              <div className="my-hackathon-stats">
                <div>
                  <span>Participants</span>
                  <strong>{event.participants}</strong>
                </div>

                <div>
                  <span>Teams</span>
                  <strong>{event.teams}</strong>
                </div>

                <div>
                  <span>Submissions</span>
                  <strong>{event.submissions}</strong>
                </div>
              </div>
            )}

            {event.status === "Pending Approval" && (
              <div className="my-hackathon-message">
                Your hackathon is waiting for admin approval.
              </div>
            )}

            {event.status === "Changes Required" && (
              <div className="my-hackathon-message warning">
                Admin requested changes before approval.
              </div>
            )}

            <div className="my-hackathon-actions">
              {event.status === "Approved" && (
                <button
                  className="my-hackathon-manage-btn"
                  onClick={() => handleManage(event)}
                >
                  Manage
                </button>
              )}

              {(event.status === "Pending Approval" ||
                event.status === "Changes Required") && (
                <button
                  className="my-hackathon-edit-btn"
                  onClick={() => handleEdit(event)}
                >
                  {event.status === "Changes Required"
                    ? "Edit & Resubmit"
                    : "Edit"}
                </button>
              )}

              <button
                className="my-hackathon-delete-btn"
                onClick={() => deleteEvent(event)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div className="my-hackathons-empty">
            <h2>No hackathons yet</h2>
            <p>
              Create your first hackathon and start organizing.
            </p>

            <button
              onClick={() => {
                window.location.href = "/create-event";
              }}
            >
              Create Hackathon
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCreatedHackathons;