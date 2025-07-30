# InfoCasas Challenge Monorepo

This repository contains both the backend (Laravel + SQLite) and frontend (React + Vite + TypeScript) for the InfoCasas coding challenge.

## Structure

```
infocasas-challenge/
├── task-manager-api/   # Laravel backend
├── task-manager-fe/    # React frontend
```

---

## Backend: Laravel API

### Prerequisites
- PHP 8.2+
- Composer


### General notes
- The API will be available at `http://localhost:8000/api/tasks`.
- The database uses SQLite by default. The `.env.example` file contains the necessary configuration. If you need to change the DB path, edit `.env` accordingly.

### Environment
- Copy `.env.example` to `.env` and adjust if needed.

---

## Frontend: React + Vite

### Prerequisites
- Node.js 18+

### General notes
- The app will be available at `http://localhost:5173` (or the port shown in the terminal).
- The API endpoint is hardcoded as `http://localhost:8000/api/tasks` in the fetch calls. Adjust if your backend runs elsewhere.

### Testing
```sh
npm test
```
- All tests are self-contained and mock backend responses. No backend is required to run tests.

---

## Environment Files
- The backend requires a `.env` file. Use `.env.example` as a template.
- The frontend does not require a `.env` file by default, but you can add one if you want to override the API URL (update the code accordingly).

---

## Notes
- All instructions are included in this README and in the respective subproject READMEs.
- If you have any issues running the project, please check the README in each subfolder for more details.