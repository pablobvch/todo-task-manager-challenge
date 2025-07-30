# Task Manager Frontend

A simple React + Vite + TypeScript frontend for managing tasks, consuming a RESTful Laravel API backend.

## Features

- List, create, edit, and delete tasks
- Filter tasks by name (local filtering, not via backend fetch)
- Responsive and clean UI
- Modal for create/edit
- Error handling and user feedback
- All API calls use fetch
- No external UI libraries
- Unit tests with Jest and React Testing Library (RTL), mocking backend responses

## Getting Started

### Prerequisites
- Node.js 18+
- Backend API running (see backend README)

### Installation
```sh
npm install
```

### Running the App
```sh
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

### Environment
- The API endpoint is hardcoded as `http://localhost:8000/api/tasks` in the fetch calls. Adjust if your backend runs elsewhere.

## Testing

Unit tests are written with Jest and React Testing Library. All backend calls are mocked, so tests do not require the backend to be running.

### Run tests
```sh
npm test
```

### Test Coverage
- **Renders and filters tasks**: Ensures tasks are listed and can be filtered by name.
- **Shows 'no data' message**: If the backend returns an empty array, the UI displays a 'No tasks found' message.
- **Delete task**: Simulates deleting a task from the main grid and checks that it is removed from the DOM.
- **Create task (modal)**: Opens the modal, creates a new task, waits for the modal to close, and checks that the new task appears in the table.
- **Edit task (modal)**: Opens the edit modal, changes the name and completed status, saves, and checks that the changes are reflected in the table.
- **Error handling**: If the API fails, the UI shows an error message.

All tests mock `fetch` and simulate user interactions, including modal flows and form submissions.

## File Structure

- `src/App.tsx` - Main React component
- `src/utils/index.ts` - API and state management helpers
- `src/components/Modal.tsx` - Modal component for create/edit
- `src/__tests__/App.test.tsx` - Unit tests (Jest + RTL)

## Dev Dependencies
- `jest`, `@testing-library/react`, `@testing-library/jest-dom`, `ts-jest`, `jest-environment-jsdom`, `identity-obj-proxy`

## Notes
- All tests are self-contained and do not require a running backend.
- The UI and tests are designed to be minimal, readable, and easy to extend.
-
**Note on Filtering:**
While the backend supports searching/filtering, the frontend implements local filtering for simplicity. All tasks are fetched once and filtered in-memory as the user types, without additional fetch requests. This keeps the challenge simple and focused on UI/UX and test coverage.

---

For backend setup and API details, see the backend README in the main project folder.
