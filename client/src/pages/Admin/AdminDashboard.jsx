import React from "react";
import "../../css/Admin/AdminDashboard.css";

function AdminDashboard() {
  const stats = [
    {
      title: "Total Events",
      value: "24",
      label: "All registered events"
    },
    {
      title: "Pending Approvals",
      value: "6",
      label: "Waiting for review"
    },
    {
      title: "Approved Events",
      value: "18",
      label: "Currently approved"
    },
    {
      title: "Total Participants",
      value: "1,284",
      label: "Across all events"
    }
  ];

  const pendingEvents = [
    {
      name: "HackFest 2026",
      organization: "ABC Coding Club",
      submitted: "2 hours ago"
    },
    {
      name: "TechNova 2026",
      organization: "TechNova Community",
      submitted: "5 hours ago"
    },
    {
      name: "AI for Good",
      organization: "Future Labs",
      submitted: "Yesterday"
    }
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage and monitor the DOGFOOD platform.</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <div className="admin-stat-card" key={stat.title}>
            <span className="admin-stat-title">{stat.title}</span>
            <strong>{stat.value}</strong>
            <span className="admin-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <section className="admin-approvals-section">
        <div className="admin-section-header">
          <div>
            <h2>Pending Event Approvals</h2>
            <p>Events waiting for admin review.</p>
          </div>

          <button className="admin-view-all-btn">
            View All
          </button>
        </div>

        <div className="admin-approval-grid">
          {pendingEvents.map((event) => (
            <div className="admin-approval-card" key={event.name}>
              <div className="admin-approval-top">
                <div className="admin-event-icon">◈</div>

                <span className="admin-pending-badge">
                  Pending Review
                </span>
              </div>

              <div className="admin-approval-info">
                <h3>{event.name}</h3>
                <span>{event.organization}</span>
                <small>Submitted {event.submitted}</small>
              </div>

              <button className="admin-details-btn">
                <span className="admin-details-text">
                  View Details
                </span>
                <span className="admin-details-arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;