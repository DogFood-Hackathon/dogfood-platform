import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Organizer/organizerParticipants.css";

function OrganizerParticipants() {
  const navigate = useNavigate();

  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "Parag Mamar",
      email: "parag@example.com",
      hackathon: "HackFest 2026",
      team: "Team Alpha",
      status: "Registered",
      registered: "20 Sep 2026"
    },
    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      hackathon: "HackFest 2026",
      team: "Code Warriors",
      status: "Registered",
      registered: "21 Sep 2026"
    },
    {
      id: 3,
      name: "Ananya Verma",
      email: "ananya@example.com",
      hackathon: "TechSprint 2026",
      team: "Neural Minds",
      status: "Registered",
      registered: "22 Sep 2026"
    },
    {
      id: 4,
      name: "Arjun Mehta",
      email: "arjun@example.com",
      hackathon: "HackFest 2026",
      team: "Solo",
      status: "Registered",
      registered: "23 Sep 2026"
    },
    {
      id: 5,
      name: "Priya Singh",
      email: "priya@example.com",
      hackathon: "CodeStorm 2026",
      team: "Pixel Coders",
      status: "Pending",
      registered: "24 Sep 2026"
    },
    {
      id: 6,
      name: "Karan Singh",
      email: "karan@example.com",
      hackathon: "TechSprint 2026",
      team: "Unassigned",
      status: "Registered",
      registered: "25 Sep 2026"
    }
  ]);

  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [selectedHackathon, setSelectedHackathon] =
    useState("All Hackathons");

  const hackathons = [
    "All Hackathons",
    "HackFest 2026",
    "TechSprint 2026",
    "CodeStorm 2026"
  ];

  const filteredParticipants = useMemo(() => {
    const searchText = search.toLowerCase();

    return participants.filter((participant) => {
      const matchesHackathon =
        selectedHackathon === "All Hackathons" ||
        participant.hackathon === selectedHackathon;

      const matchesStatus =
        activeStatus === "All" ||
        participant.status === activeStatus;

      const matchesSearch =
        participant.name.toLowerCase().includes(searchText) ||
        participant.email.toLowerCase().includes(searchText) ||
        participant.team.toLowerCase().includes(searchText) ||
        participant.hackathon.toLowerCase().includes(searchText);

      return (
        matchesHackathon &&
        matchesStatus &&
        matchesSearch
      );
    });
  }, [
    participants,
    search,
    activeStatus,
    selectedHackathon
  ]);

  const registeredCount = filteredParticipants.filter(
    (participant) => participant.status === "Registered"
  ).length;

  const pendingCount = filteredParticipants.filter(
    (participant) => participant.status === "Pending"
  ).length;

  const removeParticipant = (participant) => {
    const confirmed = window.confirm(
      `Remove ${participant.name} from ${participant.hackathon}?`
    );

    if (!confirmed) {
      return;
    }

    setParticipants((previous) =>
      previous.filter((item) => item.id !== participant.id)
    );
  };

  return (
    <div className="organizer-participants">
      <div className="organizer-participants-header">
        <div>
          <span className="organizer-page-eyebrow">
            ORGANIZER
          </span>

          <h1>Participants</h1>

          <p>
            View and manage participants across your
            hackathons.
          </p>
        </div>

        <button
          className="organizer-participants-back"
          onClick={() => navigate("/organizer")}
        >
          ← Dashboard
        </button>
      </div>

      <div className="organizer-participant-stats">
        <div className="organizer-participant-stat">
          <span>Participants</span>
          <strong>{filteredParticipants.length}</strong>
          <small>
            {selectedHackathon === "All Hackathons"
              ? "Across all hackathons"
              : selectedHackathon}
          </small>
        </div>

        <div className="organizer-participant-stat">
          <span>Registered</span>
          <strong>{registeredCount}</strong>
          <small>Active registrations</small>
        </div>

        <div className="organizer-participant-stat">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
          <small>Awaiting confirmation</small>
        </div>
      </div>

      <section className="organizer-participants-panel">
        <div className="organizer-participants-toolbar">
          <div className="organizer-participant-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search name, email, team or hackathon..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="organizer-participant-hackathon-filter">
            <span>Hackathon</span>

            <select
              value={selectedHackathon}
              onChange={(event) =>
                setSelectedHackathon(event.target.value)
              }
            >
              {hackathons.map((hackathon) => (
                <option
                  key={hackathon}
                  value={hackathon}
                >
                  {hackathon}
                </option>
              ))}
            </select>
          </div>

          <div className="organizer-participant-filters">
            {["All", "Registered", "Pending"].map(
              (filter) => (
                <button
                  key={filter}
                  className={
                    activeStatus === filter ? "active" : ""
                  }
                  onClick={() => setActiveStatus(filter)}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>

        <div className="organizer-participants-table-wrapper">
          <table className="organizer-participants-table">
            <thead>
              <tr>
                <th>Participant</th>
                <th>Email</th>
                <th>Hackathon</th>
                <th>Team</th>
                <th>Status</th>
                <th>Registered</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredParticipants.map((participant) => (
                <tr key={participant.id}>
                  <td>
                    <div className="organizer-participant-name">
                      <div className="organizer-participant-avatar">
                        {participant.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <strong>{participant.name}</strong>
                    </div>
                  </td>

                  <td>{participant.email}</td>

                  <td>
                    <span className="organizer-participant-hackathon">
                      {participant.hackathon}
                    </span>
                  </td>

                  <td>
                    <span className="organizer-participant-team">
                      {participant.team}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`organizer-participant-status ${
                        participant.status.toLowerCase()
                      }`}
                    >
                      {participant.status}
                    </span>
                  </td>

                  <td>{participant.registered}</td>

                  <td>
                    <div className="organizer-participant-actions">
                      <button
                        className="organizer-participant-view"
                        onClick={() =>
                          navigate(
                            `/organizer/participants/${participant.id}`
                          )
                        }
                      >
                        View Details
                      </button>

                      <button
                        className="organizer-participant-remove"
                        onClick={() =>
                          removeParticipant(participant)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredParticipants.length === 0 && (
            <div className="organizer-participants-empty">
              <h3>No participants found</h3>

              <p>
                Try changing the hackathon, status or search
                filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default OrganizerParticipants;