import React, { useMemo, useState } from "react";
import "../../css/Admin/Events.css";

function Events() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [events, setEvents] = useState([
    {
      id: 1,
      name: "HackFest 2026",
      organization: "ABC Coding Club",
      status: "Upcoming",
      startDate: "12 Oct 2026",
      endDate: "14 Oct 2026",
      prizePool: "₹1,00,000",
      participants: 320,
      teams: 82,
      submissions: 0,
      published: true
    },
    {
      id: 2,
      name: "TechNova 2026",
      organization: "TechNova Community",
      status: "Ongoing",
      startDate: "5 Oct 2026",
      endDate: "10 Oct 2026",
      prizePool: "₹2,50,000",
      participants: 486,
      teams: 124,
      submissions: 86,
      published: true
    },
    {
      id: 3,
      name: "AI for Good",
      organization: "Future Labs",
      status: "Upcoming",
      startDate: "20 Oct 2026",
      endDate: "22 Oct 2026",
      prizePool: "₹75,000",
      participants: 214,
      teams: 56,
      submissions: 0,
      published: true
    },
    {
      id: 4,
      name: "Web3 Unite",
      organization: "OpenTech",
      status: "Completed",
      startDate: "18 Sep 2026",
      endDate: "20 Sep 2026",
      prizePool: "₹1,50,000",
      participants: 264,
      teams: 74,
      submissions: 61,
      published: false
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [eventForm, setEventForm] = useState({
    name: "",
    organization: "",
    status: "Upcoming",
    startDate: "",
    endDate: "",
    prizePool: ""
  });

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.organization
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All Status" ||
        event.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [events, search, statusFilter]);

  const resetForm = () => {
    setEventForm({
      name: "",
      organization: "",
      status: "Upcoming",
      startDate: "",
      endDate: "",
      prizePool: ""
    });
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);

    setEventForm({
      name: event.name,
      organization: event.organization,
      status: event.status,
      startDate: event.startDate,
      endDate: event.endDate,
      prizePool: event.prizePool
    });

    setShowEditModal(true);
  };

  const handleFormChange = (field, value) => {
    setEventForm((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (
      !eventForm.name.trim() ||
      !eventForm.organization.trim() ||
      !eventForm.startDate ||
      !eventForm.endDate ||
      !eventForm.prizePool.trim()
    ) {
      alert("Please fill all required event details.");
      return false;
    }

    return true;
  };

  const addEvent = () => {
    if (!validateForm()) return;

    const newEvent = {
      id: Date.now(),
      name: eventForm.name,
      organization: eventForm.organization,
      status: eventForm.status,
      startDate: eventForm.startDate,
      endDate: eventForm.endDate,
      prizePool: eventForm.prizePool,
      participants: 0,
      teams: 0,
      submissions: 0,
      published: false
    };

    setEvents((previous) => [...previous, newEvent]);
    setShowAddModal(false);
    resetForm();
  };

  const saveEdit = () => {
    if (!validateForm() || !selectedEvent) return;

    setEvents((previous) =>
      previous.map((event) =>
        event.id === selectedEvent.id
          ? {
              ...event,
              name: eventForm.name,
              organization: eventForm.organization,
              status: eventForm.status,
              startDate: eventForm.startDate,
              endDate: eventForm.endDate,
              prizePool: eventForm.prizePool
            }
          : event
      )
    );

    setShowEditModal(false);
    setSelectedEvent(null);
    resetForm();
  };

  const removeEvent = (event) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${event.name}"?`
    );

    if (!confirmed) return;

    setEvents((previous) =>
      previous.filter((item) => item.id !== event.id)
    );
  };

  const togglePublish = (event) => {
    setEvents((previous) =>
      previous.map((item) =>
        item.id === event.id
          ? {
              ...item,
              published: !item.published
            }
          : item
      )
    );
  };

  return (
    <div className="admin-events-page">
      <div className="admin-events-header">
        <div>
          <h1>Events</h1>
          <p>
            Manage approved hackathons across the DOGFOOD platform.
          </p>
        </div>

        <button
          className="admin-events-add-btn"
          onClick={openAddModal}
        >
          + Add Event
        </button>
      </div>

      <div className="admin-events-toolbar">
        <div className="admin-events-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search events or organizations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-events-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All Status">All Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="admin-events-count">
          {filteredEvents.length} Events
        </div>
      </div>

      <div className="admin-events-grid">
        {filteredEvents.map((event) => (
          <div
            className="admin-event-card"
            key={event.id}
          >
            <div className="admin-event-card-header">
              <div className="admin-event-card-title">
                <div className="admin-event-icon">◈</div>

                <div>
                  <h3>{event.name}</h3>
                  <span>{event.organization}</span>
                </div>
              </div>

              <span
                className={`admin-event-status ${event.status.toLowerCase()}`}
              >
                {event.status}
              </span>
            </div>

            <div className="admin-event-date">
              <span>Hackathon Dates</span>

              <strong>
                {event.startDate} – {event.endDate}
              </strong>
            </div>

            <div className="admin-event-meta">
              <div>
                <span>Prize Pool</span>
                <strong>{event.prizePool}</strong>
              </div>

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

            <div className="admin-event-publish">
              <span>
                {event.published
                  ? "Public Event"
                  : "Unpublished"}
              </span>

              <button
                className={
                  event.published
                    ? "admin-event-unpublish-btn"
                    : "admin-event-publish-btn"
                }
                onClick={() => togglePublish(event)}
              >
                {event.published
                  ? "Unpublish"
                  : "Publish"}
              </button>
            </div>

            <div className="admin-event-actions">
              <button
                className="admin-event-edit-btn"
                onClick={() => openEditModal(event)}
              >
                Edit
              </button>

              <button
                className="admin-event-remove-btn"
                onClick={() => removeEvent(event)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="admin-events-empty">
          <h3>No events found</h3>
          <p>
            Try searching with a different event or
            organization name.
          </p>
        </div>
      )}

      {showAddModal && (
        <div className="admin-event-modal-overlay">
          <div className="admin-event-modal">
            <div className="admin-event-modal-header">
              <div>
                <h2>Add Event</h2>
                <p>Create a new hackathon event.</p>
              </div>

              <button
                className="admin-event-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>

            <div className="admin-event-form">
              <label>Hackathon Name</label>

              <input
                type="text"
                placeholder="Enter hackathon name"
                value={eventForm.name}
                onChange={(e) =>
                  handleFormChange("name", e.target.value)
                }
              />

              <label>Organization</label>

              <input
                type="text"
                placeholder="Enter organization"
                value={eventForm.organization}
                onChange={(e) =>
                  handleFormChange(
                    "organization",
                    e.target.value
                  )
                }
              />

              <div className="admin-event-form-grid">
                <div>
                  <label>Status</label>

                  <select
                    value={eventForm.status}
                    onChange={(e) =>
                      handleFormChange(
                        "status",
                        e.target.value
                      )
                    }
                  >
                    <option>Upcoming</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                  </select>
                </div>

                <div>
                  <label>Prize Pool</label>

                  <input
                    type="text"
                    placeholder="₹1,00,000"
                    value={eventForm.prizePool}
                    onChange={(e) =>
                      handleFormChange(
                        "prizePool",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="admin-event-form-grid">
                <div>
                  <label>Start Date</label>

                  <input
                    type="text"
                    placeholder="12 Oct 2026"
                    value={eventForm.startDate}
                    onChange={(e) =>
                      handleFormChange(
                        "startDate",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <label>End Date</label>

                  <input
                    type="text"
                    placeholder="14 Oct 2026"
                    value={eventForm.endDate}
                    onChange={(e) =>
                      handleFormChange(
                        "endDate",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <button
                className="admin-event-save-btn"
                onClick={addEvent}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedEvent && (
        <div className="admin-event-modal-overlay">
          <div className="admin-event-modal">
            <div className="admin-event-modal-header">
              <div>
                <h2>Edit Event</h2>
                <p>Update hackathon information.</p>
              </div>

              <button
                className="admin-event-modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>

            <div className="admin-event-form">
              <label>Hackathon Name</label>

              <input
                type="text"
                value={eventForm.name}
                onChange={(e) =>
                  handleFormChange("name", e.target.value)
                }
              />

              <label>Organization</label>

              <input
                type="text"
                value={eventForm.organization}
                onChange={(e) =>
                  handleFormChange(
                    "organization",
                    e.target.value
                  )
                }
              />

              <div className="admin-event-form-grid">
                <div>
                  <label>Status</label>

                  <select
                    value={eventForm.status}
                    onChange={(e) =>
                      handleFormChange(
                        "status",
                        e.target.value
                      )
                    }
                  >
                    <option>Upcoming</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                  </select>
                </div>

                <div>
                  <label>Prize Pool</label>

                  <input
                    type="text"
                    value={eventForm.prizePool}
                    onChange={(e) =>
                      handleFormChange(
                        "prizePool",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="admin-event-form-grid">
                <div>
                  <label>Start Date</label>

                  <input
                    type="text"
                    value={eventForm.startDate}
                    onChange={(e) =>
                      handleFormChange(
                        "startDate",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <label>End Date</label>

                  <input
                    type="text"
                    value={eventForm.endDate}
                    onChange={(e) =>
                      handleFormChange(
                        "endDate",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <button
                className="admin-event-save-btn"
                onClick={saveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;