import React, { useState } from "react";
import "../../css/Admin/EventApprovals.css";

function EventApprovals() {
  const [search, setSearch] = useState("");

  
const [statusFilter, setStatusFilter] = useState("All Status");

  const events = [
  {
    id: 1,
    name: "HackFest 2026",
    organization: "ABC Coding Club",
    startDate: "12 Oct 2026",
    endDate: "14 Oct 2026",
    registrationDeadline: "10 Oct 2026",
    prizePool: "₹1,00,000",
    tracks: "AI, Web, FinTech",
    teamSize: "1–4 Members",
    submitted: "2 hours ago",
    status: "Pending Review"
  },
  {
    id: 2,
    name: "TechNova 2026",
    organization: "TechNova Community",
    startDate: "5 Oct 2026",
    endDate: "10 Oct 2026",
    registrationDeadline: "3 Oct 2026",
    prizePool: "₹2,50,000",
    tracks: "AI, Cloud, Web3",
    teamSize: "2–5 Members",
    submitted: "5 hours ago",
    status: "Pending Review"
  },
  {
    id: 3,
    name: "AI for Good",
    organization: "Future Labs",
    startDate: "20 Oct 2026",
    endDate: "22 Oct 2026",
    registrationDeadline: "18 Oct 2026",
    prizePool: "₹75,000",
    tracks: "AI, ML, Healthcare",
    teamSize: "1–4 Members",
    submitted: "Yesterday",
    status: "Approved"
  },
  {
    id: 4,
    name: "Web3 Unite",
    organization: "OpenTech",
    startDate: "18 Sep 2026",
    endDate: "20 Sep 2026",
    registrationDeadline: "16 Sep 2026",
    prizePool: "₹1,50,000",
    tracks: "Web3, Blockchain, DeFi",
    teamSize: "2–4 Members",
    submitted: "Yesterday",
    status: "Rejected"
  }
];
  

const filteredEvents = events.filter((event) => {
  const matchesSearch =
    event.name.toLowerCase().includes(search.toLowerCase()) ||
    event.organization.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All Status" ||
    event.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  return (
    <div className="event-approvals-page">
      <div className="event-approvals-header">
        <div>
          <h1>Event Approvals</h1>
          <p>Review and manage hackathon event submissions.</p>
        </div>

        <div className="event-approval-count">
          {filteredEvents.length} Pending
        </div>
      </div>

      <div className="event-approvals-toolbar">
        <div className="event-search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search events or organizations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
  className="event-filter-btn"
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>
  <option value="All Status">All Status</option>
  <option value="Pending Review">Pending Review</option>
  <option value="Approved">Approved</option>
  <option value="Rejected">Rejected</option>
</select>
      </div>

      <div className="event-approvals-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div className="event-approval-card" key={event.id}>
              <div className="event-card-header">
                <div className="event-card-title">
                  <div className="event-approval-icon">◈</div>

                  <div>
                    <h3>{event.name}</h3>
                    <span>{event.organization}</span>
                  </div>
                </div>

                <span
  className={`event-status-badge ${event.status
    .toLowerCase()
    .replace(" ", "-")}`}
>
  {event.status}
</span>
              </div>

              <div className="event-card-details">
                <div className="event-detail">
                  <small>Hackathon Dates</small>
                  <strong>
                    {event.startDate} – {event.endDate}
                  </strong>
                </div>

                <div className="event-detail">
                  <small>Registration Deadline</small>
                  <strong>{event.registrationDeadline}</strong>
                </div>

                <div className="event-detail">
                  <small>Prize Pool</small>
                  <strong>{event.prizePool}</strong>
                </div>

                <div className="event-detail">
                  <small>Team Size</small>
                  <strong>{event.teamSize}</strong>
                </div>
              </div>

              <div className="event-card-footer">
                <div className="event-track-info">
                  <small>Tracks</small>
                  <span>{event.tracks}</span>
                </div>

                <div className="event-submitted">
                  Submitted {event.submitted}
                </div>

                <button className="event-view-details-btn">
                  View Details
                  <span>→</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="event-no-results">
            <h3>No events found</h3>
            <p>
              Try searching with a different event or organization name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventApprovals;