import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Organizer/OrganizerDashboard.css";

function OrganizerDashboard() {
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

  const approvedEvents = events.filter(
    (event) => event.status === "Approved"
  ).length;

  const pendingEvents = events.filter(
    (event) => event.status === "Pending Approval"
  ).length;

  const totalParticipants = events.reduce(
    (total, event) => total + event.participants,
    0
  );

  const totalTeams = events.reduce(
    (total, event) => total + event.teams,
    0
  );

  const totalSubmissions = events.reduce(
    (total, event) => total + event.submissions,
    0
  );

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
    <div className="organizer-dashboard">
      <div className="organizer-dashboard-header">
        <div>
          <span className="organizer-dashboard-eyebrow">
            ORGANIZER
          </span>

          <h1>Dashboard</h1>

          <p>
            Manage your hackathons, participants, teams and
            judging process.
          </p>
        </div>

        <button
          className="organizer-create-btn"
          onClick={() => navigate("/create-event")}
        >
          <span>+</span>
          Create Hackathon
        </button>
      </div>

      <div className="organizer-stats-grid">
        <div className="organizer-stat-card">
          <div className="organizer-stat-icon">◈</div>

          <div>
            <span>Total Hackathons</span>
            <strong>{events.length}</strong>
            <small>Hackathons organized by you</small>
          </div>
        </div>

        <div className="organizer-stat-card">
          <div className="organizer-stat-icon">✓</div>

          <div>
            <span>Approved</span>
            <strong>{approvedEvents}</strong>
            <small>Currently active</small>
          </div>
        </div>

        <div className="organizer-stat-card">
          <div className="organizer-stat-icon">◷</div>

          <div>
            <span>Pending Approval</span>
            <strong>{pendingEvents}</strong>
            <small>Waiting for admin review</small>
          </div>
        </div>

        <div className="organizer-stat-card">
          <div className="organizer-stat-icon">♙</div>

          <div>
            <span>Participants</span>
            <strong>{totalParticipants}</strong>
            <small>Across approved hackathons</small>
          </div>
        </div>
      </div>

      <section className="organizer-overview-grid">
        <div className="organizer-overview-card">
          <span>Teams</span>
          <strong>{totalTeams}</strong>
          <small>Registered across your events</small>
        </div>

        <div className="organizer-overview-card">
          <span>Submissions</span>
          <strong>{totalSubmissions}</strong>
          <small>Projects submitted</small>
        </div>
      </section>

      <section className="organizer-hackathons-section">
        <div className="organizer-section-header">
          <div>
            <h2>Hackathons Organized by You</h2>
            <p>
              View and manage all the hackathons you have
              created.
            </p>
          </div>

          <button
            className="organizer-section-create-btn"
            onClick={() => navigate("/create-event")}
          >
            + New Hackathon
          </button>
        </div>

        <div className="organizer-hackathons-list">
          {events.map((event) => (
            <div
              className="organizer-hackathon-card"
              key={event.id}
            >
              <div className="organizer-hackathon-card-header">
                <div>
                  <h3>{event.name}</h3>
                  <p>{event.organization}</p>
                </div>

                <span
                  className={`organizer-status ${event.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {event.status}
                </span>
              </div>

              <div className="organizer-hackathon-date">
                <span>Hackathon Dates</span>
                <strong>{event.dates}</strong>
              </div>

              {event.status === "Approved" && (
                <div className="organizer-hackathon-stats">
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
                <div className="organizer-message">
                  Your hackathon is waiting for admin approval.
                </div>
              )}

              {event.status === "Changes Required" && (
                <div className="organizer-message warning">
                  Admin requested changes before approval.
                </div>
              )}

              <div className="organizer-hackathon-actions">
                {event.status === "Approved" && (
                  <button
                    className="organizer-manage-btn"
                    onClick={() => handleManage(event)}
                  >
                    Manage
                  </button>
                )}

                {(event.status === "Pending Approval" ||
                  event.status === "Changes Required") && (
                  <button
                    className="organizer-edit-btn"
                    onClick={() => handleEdit(event)}
                  >
                    {event.status === "Changes Required"
                      ? "Edit & Resubmit"
                      : "Edit"}
                  </button>
                )}

                <button
                  className="organizer-delete-btn"
                  onClick={() => deleteEvent(event)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="organizer-empty-state">
              <h3>No hackathons yet</h3>

              <p>
                Create your first hackathon and start
                organizing.
              </p>

              <button
                onClick={() => navigate("/create-event")}
              >
                Create Hackathon
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default OrganizerDashboard;