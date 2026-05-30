# Task Manager App

A production-ready full-stack task management application.

## Tech Stack
- **Frontend:** Next.js (JavaScript, React, App Router)
- **Backend:** Node.js, Express.js (JavaScript, ES Modules)
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions

---

## Project Structure

```text
task-manager-app/
├── backend/                  # Express.js REST API
├── frontend/                 # Next.js web client
├── .github/workflows/        # CI/CD Workflows
├── docker-compose.yml        # Docker Multi-container Orchestration
├── Dockerfile.backend        # Production Dockerfile for Express
└── Dockerfile.frontend       # Production Dockerfile for Next.js
```

---

## Quick Start (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or v20.x recommended)
- [npm](https://www.npmjs.com/) (v9.x or later)

### Installation
From the root directory, install all dependencies for both the frontend and backend using npm workspaces:

```bash
npm run install:all
```

### Running the App
You can run both backend and frontend concurrently from the root directory:

```bash
# Run both projects in development mode
npm run dev

# Run only backend dev server
npm run dev:backend

# Run only frontend dev server
npm run dev:frontend
```

By default:
- **Frontend** will be running at [http://localhost:3000](http://localhost:3000)
- **Backend API** will be running at [http://localhost:5000](http://localhost:5000)

---

## Running with Docker

Ensure you have Docker and Docker Compose installed.

### Start the Services
Run the following command at the root to build and run all containers:

```bash
docker-compose up --build
```

- Access the frontend dashboard at `http://localhost:3000`
- Access the backend API endpoints at `http://localhost:5000`

---

## Production Build

To build both workspaces for production:

```bash
npm run build
```
