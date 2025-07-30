# Task Manager API

A simple RESTful API built with Laravel 12 for managing tasks. This project was created as a technical challenge, using technologies and patterns I am experienced with.

## Features
- CRUD operations for tasks (Create, Read, Update, Delete)
- Filter tasks by completion status and name
- Validation handled via Form Requests (`StoreTaskRequest` and `UpdateTaskRequest`)
- Uses local SQLite database for simplicity

## Requirements
- PHP 8.2+
- Composer

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-manager-api
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Copy the example environment file and edit if needed**
   ```bash
   cp .env.example .env
   # Edit .env if necessary (ensure DB_CONNECTION=sqlite and DB_DATABASE=database/database.sqlite)
   ```

4. **Create the SQLite database file**
   ```bash
   touch database/database.sqlite
   ```

5. **Run migrations**
   ```bash
   php artisan migrate
   ```

6. **(Optional) Seed the database with example tasks**
   ```bash
   php artisan db:seed --class=TaskSeeder
   ```

   This will populate the database with a few sample tasks for testing.

7. **Start the development server**
   ```bash
   php artisan serve
   ```

8. **API will be available at:**
   ```
   http://localhost:8080/api/tasks
   ```

## API Endpoints

- `GET    /api/tasks`           — List all tasks (supports `?completed=true/false` and `?name=...`)
- `POST   /api/tasks`           — Create a new task
- `GET    /api/tasks/{id}`      — Get a single task
- `PUT    /api/tasks/{id}`      — Update a task
- `PATCH  /api/tasks/{id}`      — Update a task
- `DELETE /api/tasks/{id}`      — Delete a task

## Testing

- The project is ready for unit and feature testing using PHPUnit (already included with Laravel).
- Example tests can be added in the `tests/Feature` or `tests/Unit` directories to cover API endpoints and business logic.
- To run tests:
  ```bash
  php artisan test
  ```
- For a real-world project, you would typically add tests for:
  - Task creation, update, deletion
  - Validation errors
  - Filtering and searching tasks

## Notes
- All validation logic is handled in `StoreTaskRequest` and `UpdateTaskRequest`.
- For the challenge, a local SQLite database was used for easy setup and portability.
- No authentication was added for simplicity, but Laravel Sanctum or Passport can be easily integrated for production use.