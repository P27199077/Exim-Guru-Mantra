# Exim Guru Mantra

**A full-stack website and consultation portal for an import-export consultancy.**

[Live website](https://www.eximgurumantra.com/)

I independently built the frontend and backend for Exim Guru Mantra during my web app development internship. The application brings service information, consultation inquiries, document-readiness checklists, and administrative content management into one portal.

## Features

- Service categories and detail pages for consultancy offerings.
- Consultation forms with required-field validation and MongoDB persistence when the database is available.
- HTML consultation emails sent through the Resend API, with a periodic retry worker for saved inquiries.
- Interactive document-readiness checklists.
- Administrative interfaces for services, page content, job listings, and social links.
- Responsive navigation and supporting business pages.

The backend also contains a **duty-estimate simulator** using hard-coded chapter-level rates. It is not an authoritative customs/tax calculation service.

## Stack and architecture

| Layer | Implementation |
| --- | --- |
| Frontend | React, React Router, Vite, CSS |
| API | Node.js and Express |
| Database | MongoDB |
| Email | Resend HTTP API |
| Development | Vite API proxy and Oxlint |

The frontend calls relative `/api/` routes. Vite proxies these to port 5005 during development. For a combined deployment, Express serves the built frontend from `frontend/dist/`.

**Documentation correction:** the current server uses MongoDB, not the JSON-file inquiry store described in the original README. Nodemailer is listed as a dependency, but the current dispatch implementation calls Resend directly.

## Run locally

Requires Git, Node.js 22.12 or later, npm, and a development MongoDB instance.

```sh
git clone https://github.com/P27199077/Exim-Guru-Mantra.git
cd Exim-Guru-Mantra
```

Install and start the backend in one terminal:

```sh
cd backend
npm ci
npm start
```

The default API address is **http://localhost:5005**. By default, the server attempts to connect to `mongodb://localhost:27017/exim_guru_mantra`.

Start the frontend in another terminal from the repository root:

```sh
cd frontend
npm ci
npm run dev
```

Open the local address printed by Vite, usually **http://localhost:5173**.

The server reads configuration from the process environment. It does not load a `.env` file automatically; export variables in your shell or configure them through your host.

| Variable | Purpose |
| --- | --- |
| `PORT` | API port; defaults to 5005. Keep the Vite proxy aligned if changing it. |
| `MONGODB_URI` | Development or hosted MongoDB connection string. |
| `ADMIN_USER`, `ADMIN_PASSWORD` | Fallback admin credentials; configure private values rather than using source defaults. |
| `RESEND_API_KEY` | Server-side key for email delivery. Omit for local checks that should not send mail. |
| `EMAIL_FROM` | Sender address allowed by the configured email provider. |

Use a separate development database and synthetic inquiries. Never commit database credentials, API keys, or real consultation data.

## Checks and build

From `frontend/`:

```sh
npm run lint
npm run build
```

From `backend/`, the existing `npm run build` script installs frontend dependencies and builds the frontend. Once the frontend is built, `npm start` serves the API and static frontend together.

A read-only API smoke check is available at **http://localhost:5005/api/status**. It reports that the API is running, not that MongoDB or email delivery is healthy.

There is no automated application test suite configured in the package scripts. Linting and a successful frontend build do not establish end-to-end correctness.

## Important implementation limits

- Database connection failure is logged without stopping the server.
- Consultation submission can return success even if database persistence fails; do not treat the response alone as proof an inquiry was saved.
- The email retry worker runs inside the Node process and depends on saved MongoDB inquiries. It is not a separate durable job queue.
- The current source does not establish complete server-side authorization for every administrative/data route. Review those controls before using this version with sensitive data or treating it as a hardened admin system.
- Duty estimates use illustrative rates rather than a maintained official tariff dataset.
- Source code and the public website can differ; this README describes the checked-in implementation and does not certify production configuration.

## Repository map

- `frontend/src/pages/`: public pages and administrative interface.
- `frontend/src/components/`: shared navigation, footer, and support UI.
- `frontend/vite.config.js`: React plugin and local API proxy.
- `backend/server.js`: API routes, MongoDB access, email dispatch, and static hosting.
- `scratch/`: email/template experiments; not an application test suite.

## Project scope

This repository documents my implementation work. Business statistics and marketing claims shown on the website are company content, not measurements of the application's performance or my internship impact.
