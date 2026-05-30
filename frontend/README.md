# Task Manager Client (Frontend)

Next.js React application providing a production-ready dashboard interface to manage, view, create, update, and delete tasks.

## Tech Stack
- **Framework:** Next.js (App Router, JavaScript)
- **Styling:** Premium Vanilla CSS Custom Design Tokens (Dark theme / Glassmorphism)
- **Data Fetching:** Standard React Client `fetch` API

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

### Running the Frontend

```bash
# Start development server
npm run dev

# Build the app for production
npm run build

# Start production server (after building)
npm run start
```

Default dev URL is [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` to `.env` and adjust properties:
- `NEXT_PUBLIC_API_URL`: The full URL prefix to backend server endpoints (defaults to `http://localhost:5000/api`).
