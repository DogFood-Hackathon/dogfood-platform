import React, { useState } from "react";
import "../../css/Admin/Participants.css";

function Participants() {
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("All Events");

  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "Parag Mamar",
      email: "parag@example.com",
      event: "HackFest 2026",
      team: "Team Alpha",
      registered: "28 Sep 2026",
      status: "Registered"
    },
    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      event: "TechNova 2026",
      team: "Code Warriors",
      registered: "27 Sep 2026",
      status: "Registered"
    },
    {
      id: 3,
      name: "Ananya Verma",
      email: "ananya@example.com",
      event: "HackFest 2026",
      team: "Pixel Coders",
      registered: "26 Sep 2026",
      status: "Registered"
    },
    {
      id: 4,
      name: "Arjun Mehta",
      email: "arjun@example.com",
      event: "AI for Good",
      team: "Neural Minds",
      registered: "25 Sep 2026",
      status: "Registered"
    },
    {
      id: 5,
      name: "Priya Singh",
      email: "priya@example.com",
      event: "TechNova 2026",
      team: "Solo",
      registered: "24 Sep 2026",
      status: "Registered"
    }
  ]);

  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [teamValue, setTeamValue] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const [newParticipant, setNewParticipant] = useState({
    name: "",
    email: "",
    event: "HackFest 2026",
    team: "Unassigned"
  });

  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(search.toLowerCase()) ||
      participant.email.toLowerCase().includes(search.toLowerCase());

    const matchesEvent =
      eventFilter === "All Events" ||
      participant.event === eventFilter;

    return matchesSearch && matchesEvent;
  });

  const handleView = (participant) => {
    alert(
      `Participant: ${participant.name}\nEmail: ${participant.email}\nEvent: ${participant.event}\nTeam: ${participant.team}\nStatus: ${participant.status}`
    );
  };

  const handleManageTeam = (participant) => {
    setSelectedParticipant(participant);
    setTeamValue(participant.team);
  };

  const handleSaveTeam = () => {
    if (!selectedParticipant || !teamValue.trim()) return;

    setParticipants((current) =>
      current.map((participant) =>
        participant.id === selectedParticipant.id
          ? { ...participant, team: teamValue.trim() }
          : participant
      )
    );

    setSelectedParticipant(null);
  };

  const handleRemove = (participant) => {
    const confirmed = window.confirm(
      `Remove ${participant.name} from ${participant.event}?`
    );

    if (!confirmed) return;

    setParticipants((current) =>
      current.filter((item) => item.id !== participant.id)
    );
  };

  const handleAddParticipant = () => {
    if (!newParticipant.name.trim() || !newParticipant.email.trim()) {
      alert("Please enter participant name and email.");
      return;
    }

    const participant = {
      id: Date.now(),
      name: newParticipant.name.trim(),
      email: newParticipant.email.trim(),
      event: newParticipant.event,
      team: newParticipant.team,
      registered: "28 Sep 2026",
      status: "Registered"
    };

    setParticipants((current) => [...current, participant]);

    setNewParticipant({
      name: "",
      email: "",
      event: "HackFest 2026",
      team: "Unassigned"
    });

    setShowAddModal(false);
  };

  return (
    <div className="admin-participants-page">
      <div className="admin-participants-header">
        <div>
          <h1>Participants</h1>
          <p>Manage participants registered across all events.</p>
        </div>

        <div className="admin-participants-header-actions">
          <div className="admin-participants-count">
            {filteredParticipants.length} Participants
          </div>

          <button
            className="admin-add-participant-btn"
            onClick={() => setShowAddModal(true)}
          >
            <span>+</span>
            Add Participant
          </button>
        </div>
      </div>

      <div className="admin-participants-toolbar">
        <div className="admin-participants-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search participants or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-participants-filter"
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
        >
          <option value="All Events">All Events</option>
          <option value="HackFest 2026">HackFest 2026</option>
          <option value="TechNova 2026">TechNova 2026</option>
          <option value="AI for Good">AI for Good</option>
        </select>
      </div>

      <div className="admin-participants-table">
        <div className="admin-participants-table-header">
          <span>Participant</span>
          <span>Event</span>
          <span>Team</span>
          <span>Registered</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {filteredParticipants.length > 0 ? (
          filteredParticipants.map((participant) => (
            <div
              className="admin-participant-row"
              key={participant.id}
            >
              <div className="admin-participant-info">
                <div className="admin-participant-avatar">
                  {participant.name.charAt(0)}
                </div>

                <div>
                  <strong>{participant.name}</strong>
                  <span>{participant.email}</span>
                </div>
              </div>

              <div className="admin-participant-event">
                {participant.event}
              </div>

              <div className="admin-participant-team">
                {participant.team}
              </div>

              <div className="admin-participant-date">
                {participant.registered}
              </div>

              <div>
                <span className="admin-participant-status">
                  {participant.status}
                </span>
              </div>

              <div className="admin-participant-actions">
                <button
                  className="admin-participant-action view"
                  onClick={() => handleView(participant)}
                >
                  View
                </button>

                <button
                  className="admin-participant-action manage"
                  onClick={() => handleManageTeam(participant)}
                >
                  Team
                </button>

                <button
                  className="admin-participant-action remove"
                  onClick={() => handleRemove(participant)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="admin-participants-empty">
            <h3>No participants found</h3>
            <p>
              Try searching with a different name, email, or event.
            </p>
          </div>
        )}
      </div>

      {selectedParticipant && (
        <div
          className="admin-participant-modal-overlay"
          onClick={() => setSelectedParticipant(null)}
        >
          <div
            className="admin-participant-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-participant-modal-header">
              <div>
                <h2>Manage Team</h2>
                <p>{selectedParticipant.name}</p>
              </div>

              <button
                className="admin-participant-modal-close"
                onClick={() => setSelectedParticipant(null)}
              >
                ×
              </button>
            </div>

            <div className="admin-participant-form-group">
              <label>Team</label>

              <select
                value={teamValue}
                onChange={(e) => setTeamValue(e.target.value)}
              >
                <option value="Team Alpha">Team Alpha</option>
                <option value="Code Warriors">Code Warriors</option>
                <option value="Pixel Coders">Pixel Coders</option>
                <option value="Neural Minds">Neural Minds</option>
                <option value="Solo">Solo</option>
                <option value="Unassigned">Unassigned</option>
              </select>
            </div>

            <div className="admin-participant-modal-actions">
              <button
                className="admin-participant-modal-cancel"
                onClick={() => setSelectedParticipant(null)}
              >
                Cancel
              </button>

              <button
                className="admin-participant-modal-save"
                onClick={handleSaveTeam}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div
          className="admin-participant-modal-overlay"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="admin-participant-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-participant-modal-header">
              <div>
                <h2>Add Participant</h2>
                <p>Register a participant to an event.</p>
              </div>

              <button
                className="admin-participant-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>

            <div className="admin-participant-form-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter participant name"
                value={newParticipant.name}
                onChange={(e) =>
                  setNewParticipant({
                    ...newParticipant,
                    name: e.target.value
                  })
                }
              />
            </div>

            <div className="admin-participant-form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter participant email"
                value={newParticipant.email}
                onChange={(e) =>
                  setNewParticipant({
                    ...newParticipant,
                    email: e.target.value
                  })
                }
              />
            </div>

            <div className="admin-participant-form-group">
              <label>Event</label>

              <select
                value={newParticipant.event}
                onChange={(e) =>
                  setNewParticipant({
                    ...newParticipant,
                    event: e.target.value
                  })
                }
              >
                <option value="HackFest 2026">HackFest 2026</option>
                <option value="TechNova 2026">TechNova 2026</option>
                <option value="AI for Good">AI for Good</option>
              </select>
            </div>

            <div className="admin-participant-form-group">
              <label>Team</label>

              <select
                value={newParticipant.team}
                onChange={(e) =>
                  setNewParticipant({
                    ...newParticipant,
                    team: e.target.value
                  })
                }
              >
                <option value="Unassigned">Unassigned</option>
                <option value="Team Alpha">Team Alpha</option>
                <option value="Code Warriors">Code Warriors</option>
                <option value="Pixel Coders">Pixel Coders</option>
                <option value="Neural Minds">Neural Minds</option>
                <option value="Solo">Solo</option>
              </select>
            </div>

            <div className="admin-participant-modal-actions">
              <button
                className="admin-participant-modal-cancel"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>

              <button
                className="admin-participant-modal-save"
                onClick={handleAddParticipant}
              >
                Add Participant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Participants;