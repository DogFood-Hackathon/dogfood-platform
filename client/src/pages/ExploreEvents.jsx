import React, { useState } from "react";
import "../css/ExploreEvents.css";
import Navbar from "../components/navbar";

const events = [
  {
    id: 1,
    name: "HackFest 2026",
    organization: "ABC Coding Club",
    description: "Build innovative solutions for real-world problems.",
    status: "Upcoming",
    dates: "12 Oct – 14 Oct 2026",
    prize: "₹1,00,000",
    tracks: "AI · Web · FinTech",
  },
  {
    id: 2,
    name: "TechNova 2026",
    organization: "TechNova Community",
    description: "Create the next generation of technology products.",
    status: "Ongoing",
    dates: "5 Oct – 10 Oct 2026",
    prize: "₹2,50,000",
    tracks: "AI · Cloud · Web3",
  },
  {
    id: 3,
    name: "AI for Good",
    organization: "Future Labs",
    description: "Use artificial intelligence to solve meaningful problems.",
    status: "Upcoming",
    dates: "20 Oct – 22 Oct 2026",
    prize: "₹75,000",
    tracks: "AI · ML · Healthcare",
  },
  {
    id: 4,
    name: "Web3 Unite",
    organization: "OpenTech",
    description: "Build decentralized applications for the future.",
    status: "Completed",
    dates: "18 Sep – 20 Sep 2026",
    prize: "₹1,50,000",
    tracks: "Web3 · Blockchain · DeFi",
  },
];

function ExploreEvents() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.organization.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.tracks.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All" || event.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (

    <>
    
    <div className="explore-events-page">

        <Navbar/>
        
      <div className="explore-events-header">
        <span>DISCOVER</span>
        <h1>Explore Hackathons</h1>
        <p>
          Discover hackathons, find your challenge, and start building.
        </p>
      </div>

      <div className="explore-events-search">
        <span>⌕</span>
        <input
          type="text"
          placeholder="Search hackathons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="event-filters">
        {["All", "Upcoming", "Ongoing", "Completed"].map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? "active" : ""}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div className="explore-event-card" key={event.id}>
              <div className="event-card-top">
                <div className="event-logo">◈</div>

                <span
                  className={`event-status ${event.status.toLowerCase()}`}
                >
                  {event.status}
                </span>
              </div>

              <h2>{event.name}</h2>

              <span className="event-organization">
                {event.organization}
              </span>

              <p className="event-description">{event.description}</p>

              <div className="event-info">
                <div>
                  <span>DATES</span>
                  <strong>{event.dates}</strong>
                </div>

                <div>
                  <span>PRIZE POOL</span>
                  <strong>{event.prize}</strong>
                </div>
              </div>

              <div className="event-card-footer">
                <span>{event.tracks}</span>

                <strong>
                  View Event <span>→</span>
                </strong>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">
            <h3>No hackathons found</h3>
            <p>Try a different search or filter.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default ExploreEvents;