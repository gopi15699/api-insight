# API Insight — Frontend

> Next.js 16 dashboard for API Insight — real-time error monitoring, log exploration, error grouping, and project management.

---

## Overview

The frontend is a modern, responsive dashboard built with Next.js 16 (App Router) that provides:

- **Login / Register** — Email/password and Google OAuth sign-in
- **Dashboard Overview** — Error stats, recent errors, project summary
- **Log Explorer** — Filterable, paginated table of all error logs with detail modal
- **Error Groups** — Aggregated error groups with frequency information
- **Project Management** — Create projects, view API keys, configure alert thresholds

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework (App Router) |
| React 19 | UI library |
| Tailwind CSS 4 | Utility-first styling |
| Radix UI | Accessible UI primitives (Dialog, Select, Dropdown, etc.) |
| Redux Toolkit | Global state management |
| Axios | HTTP client |
| GSAP | Scroll reveal animations |
| Lucide React | Icon library |
| Sonner | Toast notifications |
| class-variance-authority | Component variant management |

---

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx              Root layout (providers, fonts)
│   │   ├── template.tsx            Page transition template
│   │   ├── page.tsx                Landing / home page
│   │   ├── globals.css             Global styles + Tailwind
│   │   ├── login/
│   │   │   └── page.tsx            Sign-in page
│   │   ├── register/
│   │   │   └── page.tsx            Sign-up page
│   │   └── dashboard/
│   │       ├── layout.tsx          Dashboard layout (sidebar)
│   │       ├── page.tsx            Overview — stats + recent errors
│   │       ├── logs/
│   │       │   └── page.tsx        Filterable log table + detail modal
│   │       ├── groups/
│   │       │   └── page.tsx        Error groups with frequency bars
│   │       └── projects/
│   │           ├── page.tsx        Project list
│   │           └── new/
│   │               └── page.tsx    Create new project form
│   ├── components/
│   │   ├── auth/
│   │   │   └── GoogleButton.tsx    Google OAuth button
│   │   ├── layout/
│   │   │   └── Sidebar.tsx         Dashboard sidebar navigation
│   │   ├── logs/
│   │   │   ├── MethodBadge.tsx     HTTP method badge (GET, POST, etc.)
│   │   │   └── StatusBadge.tsx     Status code badge (color-coded)
│   │   ├── projects/
│   │   │   └── StatCard.tsx        Statistics card component
│   │   ├── providers/
│   │   │   └── StoreProvider.tsx   Redux store provider
│   │   └── ui/                     shadcn/ui components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       └── skeleton.tsx
│   ├── hooks/
│   │   └── useGsapReveal.ts       GSAP scroll reveal animation hook
│   ├── lib/
│   │   ├── api.ts                  Axios instance with auth interceptors
│   │   ├── auth.ts                 Auth helpers (token storage)
│   │   └── utils.ts                Utility functions (cn, etc.)
│   ├── store/
│   │   ├── index.ts                Redux store configuration
│   │   ├── hooks.ts                Typed Redux hooks
│   │   └── slices/
│   │       └── authSlice.ts        Auth state (user, token, login/logout)
│   └── types/
│       └── index.ts                TypeScript type definitions
├── public/                         Static assets (SVGs)
├── components.json                 shadcn/ui configuration
├── tailwind.config.ts              Tailwind configuration
├── tsconfig.json                   TypeScript configuration
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- API Insight backend running (default: `http://localhost:5001`)

### Setup

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev    # Starts at http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

---

## Dashboard Pages

### Overview (`/dashboard`)
- Total errors, 24-hour error count, error breakdown by status code
- Recent error log entries
- Quick navigation to logs and groups

### Logs (`/dashboard/logs`)
- Paginated table of all error logs
- Filters: status code, HTTP method, endpoint, date range
- Click any row to view full detail (error message, stack trace, request body, suggestion, etc.)

### Error Groups (`/dashboard/groups`)
- Errors grouped by endpoint + normalised error message
- Frequency count, first/last occurrence
- Root cause suggestion per group

### Projects (`/dashboard/projects`)
- List all your projects with API keys
- Create new project with name, description, alert threshold, and alert email

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url.com`
4. Deploy

### Self-hosted

```bash
npm run build
npm start
```

Set the `NEXT_PUBLIC_API_URL` environment variable to point to your backend.

---

## License

Apache License 2.0
