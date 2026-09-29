import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Organizer/OrganizerHackathons.css";

function OrganizerHackathons() {
  const navigate = useNavigate();

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

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEvents = events.filter((event) => {
    if (activeFilter === "All") {
      return true;
    }

    return event.status === activeFilter;
  });

  const deleteEvent = (event) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setEvents((previous) =>
      previous.filter((item) => item.id !== event.id)
    );
  };

  const handleManage = (event) => {
    navigate(`/organizer/events/${event.id}`);
  };

  const handleEdit = (event) => {
    navigate(`/create-event?edit=${event.id}`);
  };

  return (
    <div className="organizer-hackathons">
      <div className="organizer-hackathons-header">
        <div>
          <span className="organizer-page-eyebrow">
            ORGANIZER
          </span>

          <h1>Hackathons</h1>

          <p>
            Create, manage and track the hackathons you
            organize.
          </p>
        </div>

        <button
          className="organizer-hackathons-create-btn"
          onClick={() => navigate("/create-event")}
        >
          <span>+</span>
          Create Hackathon
        </button>
      </div>

      <div className="organizer-hackathons-toolbar">
        <div className="organizer-hackathons-count">
          <strong>{events.length}</strong>
          <span>Hackathons</span>
        </div>

        <div className="organizer-hackathon-filters">
          {[
            "All",
            "Approved",
            "Pending Approval",
            "Changes Required"
          ].map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter ? "active" : ""
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="organizer-hackathons-list">
        {filteredEvents.map((event) => (
          <div
            className="organizer-hackathon-management-card"
            key={event.id}
          >
            <div className="organizer-management-card-top">
              <div>
                <h2>{event.name}</h2>
                <p>{event.organization}</p>
              </div>

              <span
                className={`organizer-management-status ${event.status
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
              >
                {event.status}
              </span>
            </div>

            <div className="organizer-management-date">
              <span>Hackathon Dates</span>
              <strong>{event.dates}</strong>
            </div>

            {event.status === "Approved" && (
              <div className="organizer-management-stats">
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
              <div className="organizer-management-message">
                This hackathon is waiting for admin approval.
              </div>
            )}

            {event.status === "Changes Required" && (
              <div className="organizer-management-message warning">
                Admin requested changes before approval.
              </div>
            )}

            <div className="organizer-management-actions">
              {event.status === "Approved" && (
                <button
                  className="organizer-management-btn"
                  onClick={() => handleManage(event)}
                >
                  Manage
                </button>
              )}

              {(event.status === "Pending Approval" ||
                event.status === "Changes Required") && (
                <button
                  className="organizer-management-edit-btn"
                  onClick={() => handleEdit(event)}
                >
                  {event.status === "Changes Required"
                    ? "Edit & Resubmit"
                    : "Edit"}
                </button>
              )}

              <button
                className="organizer-management-delete-btn"
                onClick={() => deleteEvent(event)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="organizer-no-hackathons">
            <h2>No hackathons found</h2>
            <p>
              There are no hackathons matching this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrganizerHackathons;