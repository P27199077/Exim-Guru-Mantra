# Exim Guru Mantra Template

A premium, state-of-the-art web portal for **Exim Guru Mantra** (Export-Import Consulting & Compliance Services). Inspired by the professional tax/legal service layout of **Lex N Tax**, this project is built on **React** (frontend via Vite) and **Node.js** (Express API backend).

## Design Features
- **Visual Glow Accents**: Dynamic blue/gold radial gradients in the background to convey a high-end corporate tech environment.
- **Glassmorphic Navbar**: Sticky navigation header with blur filters.
- **Interactive Checklists**: Verify your firm's document eligibility for Import Export Code (IEC) application.
- **Customs Duty & Drawback Calculator**: Calculates BCD, Social Surcharges, GST, and rebate offsets based on target HS codes.
- **Consultation Forms**: Fully integrated client form that saves inquiry queues directly to JSON file storage.

---

## Directory Structure

```
exim-gurur-mantra/
├── backend/
│   ├── data/
│   │   └── queries.json          # File storage for consultation submissions
│   ├── server.js                 # Express server code
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/           # Navbar, Footer
    │   ├── pages/                # Home, Services, Calculator, Contact
    │   ├── App.jsx               # Routes setup
    │   ├── index.css             # Premium custom styling variables & layouts
    │   └── main.jsx              # React root mount
    └── package.json
```

---

## Getting Started

### 1. Start the Backend API Server
Navigate to the `backend/` directory, install packages, and boot the server:
```bash
cd backend
npm install
npm start
```
The API server runs on **`http://localhost:5005`**.

### 2. Start the React Frontend App
Navigate to the `frontend/` directory, install packages, and boot the Vite server:
```bash
cd frontend
npm install
npm run dev
```
The React development server runs on **`http://localhost:5173`** (or next available port).

---

## Primary API Endpoints

- **`POST /api/consultation`**: Receives client consultation details and writes them to the `queries.json` file.
- **`GET /api/consultations`**: Returns a list of all submitted consultations (for reporting/dashboarding).
- **`POST /api/duty-estimate`**: Generates BCD and drawback estimates based on HS Code digits.
