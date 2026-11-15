# Exim Guru Mantra frontend

React and Vite frontend for the [Exim Guru Mantra website](https://www.eximgurumantra.com/).

See the [main README](../README.md) for project scope, backend configuration, implementation limits, and the complete local setup.

## Development

Run the Express backend on port 5005, then from this directory:

```sh
npm ci
npm run dev
```

Open the address printed by Vite. Requests to `/api/` are proxied to `http://localhost:5005` by `vite.config.js`.

## Available checks

```sh
npm run lint
npm run build
npm run preview
```

`preview` serves the built frontend for inspection; it is not the Express API server. For the combined application, build this frontend and start the backend as described in the main README.

## Structure

- `src/pages/`: routed business pages, consultation forms, document checklists, and administration.
- `src/components/`: shared interface components.
- `src/index.css`: global styling.
- `src/App.jsx`: route definitions.

Never put server-side email keys or database credentials in frontend code.
