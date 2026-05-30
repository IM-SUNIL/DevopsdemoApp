# Task Manager API (Backend)

Node.js & Express.js server providing REST API endpoints for the Task Manager Application.

## Tech Stack
- **Runtime:** Node.js (ES Modules syntax using `"type": "module"`)
- **Framework:** Express.js
- **Security:** Helmet (secure headers) & CORS
- **Logging:** Morgan & custom duration logger
- **Dev Tools:** Nodemon for hot reloading

---

## Getting Started

### Prerequisites
- Node.js (v18.x or v20.x)
- npm (v9.x or later)

### Installation
From this directory:

```bash
npm install
```

### Running the API

```bash
# Start in development mode (with hot-reload via nodemon)
npm run dev

# Start in production mode
npm run start
```

---

## API Endpoints

All endpoints are prefixed with `/api`.

### Health Check
- **`GET /api/health`**
  - Returns current system health indicators, uptime, and timestamp.

### Tasks Resource
- **`GET /api/tasks`**
  - Returns a list of all tasks.
- **`GET /api/tasks/:id`**
  - Returns details of a specific task. Returns `404` if not found.
- **`POST /api/tasks`**
  - Creates a new task.
  - Body params: `{ "title": "String" (required), "description": "String", "status": "pending" | "in-progress" | "completed" }`
- **`PUT /api/tasks/:id`**
  - Updates an existing task.
  - Body params: `{ "title": "String", "description": "String", "status": "String" }` (all optional)
- **`DELETE /api/tasks/:id`**
  - Deletes a task.

---

## Environment Variables

Copy `.env.example` to `.env` and adjust properties:
- `PORT`: Port number the server listens to (defaults to `5000`).
- `NODE_ENV`: Application environment (`development` or `production`).
- `CORS_ORIGIN`: Allowed origins for HTTP access (defaults to `http://localhost:3000`).
