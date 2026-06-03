# TaskPilot AI

AI-powered task management application that helps users create, organize, and plan work using AI assistance.

## Reviewer setup (AI features)

Auth and task management work without OpenAI. To enable **AI Breakdown**, **AI Generate**, **AI Priority**, and **AI Time Estimation**:

1. Create `server/.env` with `MONGODB_URI`, `JWT_SECRET`, and **`OPENAI_API_KEY`** ([get a key](https://platform.openai.com/api-keys))
2. Set `CLIENT_URL` to include your frontend URL(s)
3. Ensure your OpenAI account has **billing/credits** enabled (`gpt-4o-mini` is inexpensive)
4. Restart the API: `cd server && npm run dev`

> Use an **OpenAI** key only (`sk-...`). Gemini/Claude keys will not work with this project unless you change the backend.

Without a valid key with quota, AI routes return a clear error; everything else still works.

## Features

- **Authentication** — Register, login, logout with JWT stored in HttpOnly cookies
- **Task CRUD** — Create, read, update, delete tasks with full metadata
- **Filtering** — Filter by status, priority, category; search by title
- **AI Features**
  - Smart Task Breakdown — Break goals into actionable subtasks
  - Priority Suggestion — AI suggests Low / Medium / High priority
  - Time Estimation — AI suggests task duration in minutes (5–480)
  - Natural Language Task Generator — Generate and bulk-add structured tasks

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React, Vite, Tailwind CSS, React Query |
| Backend  | Node.js, Express.js                 |
| Database | MongoDB Atlas, Mongoose             |
| AI       | OpenAI GPT-4o-mini                  |
| Deploy   | Vercel (client), Render (server)    |

## Project Structure

```
taskpilot-ai/
├── client/          # React frontend
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── layouts/
│       ├── services/
│       └── context/
└── server/          # Express API
    └── src/
        ├── config/
        ├── middleware/
        ├── models/
        ├── controllers/
        ├── services/
        ├── utils/
        └── routes/
```

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB Atlas account
- OpenAI API key (for AI features)

### 1. Clone and install

```bash
git clone https://github.com/mritul3/TaskPilot-AI.git
cd TaskPilot-AI

# Backend
cd server
# Copy .env.example to .env and fill in values — gitignored
npm install

# Frontend
cd ../client
# .env is in the repo with VITE_API_URL
npm install
```

### 2. Environment (one file each)

**server/.env** (local only, not committed)

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=sk-...
CLIENT_URL=http://localhost:5173,https://task-pilot-fe.vercel.app
```

**client/.env** (committed)

```env
VITE_API_URL=https://taskpilot-be.onrender.com/api
```

### 3. Run locally

```bash
# Terminal 1 — API
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## API Endpoints

### Auth

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| POST   | `/api/auth/register`| Register user      |
| POST   | `/api/auth/login`   | Login              |
| POST   | `/api/auth/logout`  | Logout             |
| GET    | `/api/auth/me`      | Current user       |

### Tasks

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| GET    | `/api/tasks`       | List tasks (with filters)|
| POST   | `/api/tasks`       | Create task              |
| PUT    | `/api/tasks/:id`   | Update task              |
| DELETE | `/api/tasks/:id`   | Delete task              |
| POST   | `/api/tasks/bulk`  | Bulk create (AI generate)|

### AI

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| POST   | `/api/ai/breakdown`   | Smart task breakdown  |
| POST   | `/api/ai/priority`    | Priority suggestion   |
| POST   | `/api/ai/estimate`    | Time estimation (minutes) |
| POST   | `/api/ai/generate`    | NL task generation    |

## Deployment

### Backend (Render)

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your repo, set root directory to `server` (or use included `render.yaml`)
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables from your `server/.env` (same keys)
6. Set `CLIENT_URL` to your Vercel frontend URL (e.g. `https://your-app.vercel.app`)
7. Set `NODE_ENV=production`

### Frontend (Vercel)

1. Import project on [Vercel](https://vercel.com)
2. Set root directory to `client`
3. Add `VITE_API_URL=https://your-api.onrender.com/api`
4. Deploy

### MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Add your IP to the allowlist (or `0.0.0.0/0` for Render)
3. Copy the connection string to `MONGODB_URI`

## Validation & security

- Server-side validation with `express-validator` (auth, tasks, filters, bulk)
- Mongoose schema validation and enums for priority/status
- Task fields include optional `estimatedMinutes` (5–480, rounded to 15-min steps)
- AI output normalized (priority/status/estimate clamped; generated tasks sanitized)
- JWT in **HttpOnly cookies**; OpenAI key server-side only
- Per-user task isolation via `userId`

## License

MIT
