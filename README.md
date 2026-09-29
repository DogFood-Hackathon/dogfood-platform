# DOGFOOD

> The platform that will judge you.

DOGFOOD is a self-hostable hackathon management and judging platform designed to handle the complete hackathon lifecycle — from event creation and participant registration to team formation, project submissions, judge assignments, evaluations, scoring, normalization, and final results.

The platform is designed to run locally using Docker Compose and does not depend on proprietary cloud services or hosted databases.

---

## Overview

Running a hackathon usually requires multiple disconnected tools for:

- Event registration
- Team formation
- Project submissions
- Judge management
- Rubric configuration
- Project evaluation
- Score processing
- Results
- Public project discovery

DOGFOOD brings these workflows together into a single platform.

### Core Workflow

```text
User
  ↓
Join OR Organize
  ↓
Admin Approval
  ↓
Hackathon
  ↓
Participants
  ↓
Teams
  ↓
Project Submissions
  ↓
Judge Assignment
  ↓
Judging
  ↓
Score Processing
  ↓
Normalization
  ↓
Results
  ↓
Public Gallery
Key Features
Participant
User registration and login
Explore available hackathons
Register for hackathons
Join or create teams
View team information
Submit projects
Edit project submissions before the deadline
Explore public projects
Organizer
Create hackathons
Configure event details
Configure schedule and eligibility
Manage participants
Manage teams
Manage submissions
Manage judges
Configure judging workflow
View judging progress
View final results
Export results
Judge
View assigned projects
Access project information
Evaluate projects using a rubric
Provide scores and feedback
Save evaluation drafts
Submit evaluations
Update submitted evaluations when permitted

Judges can only access projects assigned to them and cannot view other judges' evaluations.

Admin
Review organizer event requests
Approve or reject hackathons
Manage platform events
Manage participants and teams
Manage submissions
Manage judges
Monitor judging
Manage final results
Judging System

DOGFOOD supports configurable weighted judging rubrics.

Example rubric:

Criterion	Weight
Technical Implementation	40%
Innovation	25%
Impact	20%
Presentation	15%

Judges provide scores on a 0–10 scale.

The weighted score is calculated from the configured rubric weights.

Final Score =
Technical × 40%
+ Innovation × 25%
+ Impact × 20%
+ Presentation × 15%

The backend is responsible for authoritative score calculation and result processing.

Fair Judging

DOGFOOD is designed with judge isolation in mind.

A judge:

Can only see assigned projects
Cannot see unassigned projects
Cannot see another judge's scores
Cannot see the overall ranking before results are published
Can submit evaluations independently

This helps maintain separation between individual judging decisions.

Normalization

The platform architecture supports cross-judge score normalization.

Normalization can be applied by the backend before final ranking when multiple judges evaluate the same projects.

The processed scores are then used to generate final results and rankings.

User Roles

DOGFOOD supports multiple roles.

Participant
Organizer
Judge
Admin

A user can participate in hackathons while also becoming an approved organizer.

Organizer permissions are granted after the organizer's event request is approved by an administrator.

Organizer Approval Workflow
User
 ↓
Organize Hackathon
 ↓
Select Organizer Type
 ↓
Create Event
 ↓
Submit for Approval
 ↓
Admin Review
 ├── Approve → Event becomes public
 │
 └── Changes Required → Organizer edits and resubmits

Supported organizer types include:

Student Club / Community
College / University
Company / Organization
Independent Organizer
Technology Stack
Frontend
React
React Router
CSS
Vite
Backend

The backend provides:

Authentication
Event management
Participant management
Team management
Submission management
Judge assignment
Evaluation processing
Score calculation
Results
Database

The application is designed to work with a locally hosted database through Docker Compose.

Infrastructure
Docker
Docker Compose
Project Structure
DOGFOOD/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Admin/
│   │   ├── Judge/
│   │   ├── Organizer/
│   │   ├── CreateEvent/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Admin/
│   │   ├── Judge/
│   │   ├── Organizer/
│   │   ├── HomePage.jsx
│   │   ├── ExploreEvents.jsx
│   │   ├── CreateEvent.jsx
│   │   └── AboutUs.jsx
│   │
│   ├── css/
│   │   ├── Admin/
│   │   ├── Judge/
│   │   ├── Organizer/
│   │   └── ...
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
└── README.md
Running Locally
Prerequisites

Make sure you have:

Docker
Docker Compose

installed on your system.

You do not need a separately hosted database for the Docker-based setup.

Run With Docker

Clone the repository:

git clone <YOUR_REPOSITORY_URL>
cd <PROJECT_DIRECTORY>

Start the application:

docker compose up --build

Once the containers are running, open:

http://localhost:5173

To stop the application:

docker compose down
Development Without Docker

Install dependencies:

npm install

Start the development server:

npm run dev

The application will be available at:

http://localhost:5173
Application Areas
Public Platform
Home
Explore Hackathons
Explore Projects
About Us
Participant
Dashboard
Hackathon Registration
Teams
Submissions
Profile
Organizer
Dashboard
Hackathons
Participants
Teams
Submissions
Judges
Rubric
Judging
Results
Judge
Judge Dashboard
Assigned Projects
Project Evaluation
Evaluation History
Admin
Admin Dashboard
Event Approvals
Events
Participants
Teams
Submissions
Judges
Judging
Results
Submission Lifecycle

A participant can submit a project through the following workflow:

Register
   ↓
Join Team
   ↓
Create Project
   ↓
Add Description
   ↓
Add Tech Stack
   ↓
Add Repository
   ↓
Add Demo
   ↓
Save Draft
   ↓
Submit

After the deadline, submissions can no longer be modified.

Judge Workflow
Judge Login
   ↓
Assigned Projects
   ↓
Open Project
   ↓
Review Submission
   ↓
Score Rubric
   ↓
Add Feedback
   ↓
Save Draft / Submit
   ↓
Evaluation Complete
Results Workflow
Judge Evaluations
      ↓
Score Aggregation
      ↓
Normalization
      ↓
Final Scores
      ↓
Ranking
      ↓
Organizer Review
      ↓
Publish Results

Published results can then be exposed through the public platform.

API

The backend is designed around REST-style API endpoints covering the main platform actions.

Core API areas include:

/auth
/events
/participants
/teams
/submissions
/judges
/evaluations
/results

API implementation and endpoint details are documented separately in the project architecture documentation.

Security & Access Control

The platform uses role-based access control.

Participant

Can access:

Own registrations
Own teams
Own submissions
Public hackathon and project information
Organizer

Can access management features for events they organize.

Judge

Can access only projects assigned to them.

Admin

Can manage platform-level resources and event approvals.

Self-Hostability

DOGFOOD is designed to be self-hosted.

The goal is to allow an organizer to run the complete platform locally without depending on:

Hosted databases
Proprietary authentication providers
External judging services
Cloud accounts
Proprietary infrastructure

The intended deployment experience is:

docker compose up
Design Goals

DOGFOOD focuses on:

Simplicity

One platform for the complete hackathon lifecycle.

Transparency

Clear judging and result workflows.

Isolation

Judges only access projects assigned to them.

Self-Hosting

Run the platform on your own infrastructure.

Extensibility

The architecture is designed to support additional features such as APIs, webhooks, certificates, public galleries and integrations.

Future Extensions

Potential extensions include:

REST API and webhooks
Certificate generation
Signed judge participation records
Embeddable project gallery
Bulk participant import/export
Advanced normalization methods
Community voting
Audit trails
Advanced analytics
Team

Built during the DOGFOOD 72-Hour Hackathon.

Contributors
Parag Mamar — Frontend / UI / UX
Tanu — Backend / Database / Judging Engine
