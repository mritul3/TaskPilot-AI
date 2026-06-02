# TaskPilot AI — Frontend

React SPA for **TaskPilot AI**: task management dashboard with AI-assisted breakdown, priority suggestions, and natural-language task generation.

Part of the [TaskPilot AI monorepo](https://github.com/mritul3/TaskPilot-AI) (`client/` folder). Pairs with the Express API in `server/`.

## Tech stack

- **React 19** + **Vite 6**
- **Tailwind CSS 4**
- **React Router** — routing & protected routes
- **TanStack React Query** — server state
- **Axios** — API client (`withCredentials` for cookies)
- **React Hot Toast** — notifications
- **Lucide React** — icons

## Prerequisites

- Node.js 20+
- Running TaskPilot API from `../server` (local or deployed)

## Quick start

```bash
git clone https://github.com/mritul3/TaskPilot-AI.git
cd TaskPilot-AI/client
npm install
npm run dev
```

Open **http://localhost:5173**

## Environment (one file)

All config is in **`.env`** at the project root:

```env
VITE_API_URL=https://taskpilot-be.onrender.com/api
```

This file is used for **`npm run dev`** and **`npm run build`** (including Vercel).

| Variable | Description |
| -------- | ----------- |
| `VITE_API_URL` | Backend URL, must end with `/api` |

**Optional — local API only:** create `.env.local` (gitignored) to override:

```env
VITE_API_URL=http://localhost:5000/api
```

Restart the dev server after changing env files.

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Development server (port 5173) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint |

## Features

- **Auth** — Register, login, logout; JWT via HttpOnly cookies
- **Dashboard** — Task cards, stats, filters (status, priority, category), title search
- **Tasks** — Create, edit, delete, inline status updates
- **AI**
  - **Breakdown** — Split a goal into subtasks
  - **AI Generate** — NL prompt → tasks → add to dashboard
  - **AI Suggest** — Priority hint in task form

AI calls require a valid **OpenAI key on the backend** (see backend README). The frontend never sees the API key.

## Project structure

```
src/
├── components/     # UI, tasks, AI modals
├── context/        # AuthProvider
├── layouts/        # Auth & dashboard shells
├── pages/          # Login, Register, Dashboard
├── services/       # Axios API modules
├── utils/          # Task helpers, colors
├── App.jsx         # Routes
└── main.jsx        # Entry
```

## Deploy on Vercel

1. Import this repo on [Vercel](https://vercel.com).
2. **Root directory:** `.` (repo root).
3. **Framework preset:** Vite (auto-detected).
4. **Environment variable:**
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Deploy.

`vercel.json` includes SPA rewrites so client-side routing works.

### CORS

Set the backend `CLIENT_URL` to your Vercel URL (e.g. `https://taskpilot.vercel.app`) so cookies and CORS work in production.

## Full stack local dev

```bash
# Terminal 1 — API
cd ../TaskPilot-BE   # or your server folder
npm run dev

# Terminal 2 — Frontend
cd TaskPilot-FE
npm run dev
```

1. Register at http://localhost:5173/register  
2. Create tasks or use **AI Generate** (backend must have `OPENAI_API_KEY`)

## License

MIT
