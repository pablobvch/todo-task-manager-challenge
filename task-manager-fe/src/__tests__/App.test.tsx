import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

// Mock fetch global
const mockTasks = [
  { id: 1, name: "Task 1", completed: false },
  { id: 2, name: "Task 2", completed: true },
];

let consoleErrorSpy: jest.SpyInstance;

beforeEach(() => {
  global.fetch = jest.fn((url: RequestInfo | URL, options?: RequestInit) => {
    if (url?.toString().includes("/api/tasks") && !options) {
      // GET all
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTasks),
      } as Response);
    }
    if (url?.toString().includes("/api/tasks") && options?.method === "POST") {
      // CREATE
      const body = options?.body ? JSON.parse(options.body as string) : {};
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ id: 3, name: body.name || "Task X", completed: false }),
      } as Response);
    }
    if (
      url?.toString().includes("/api/tasks/1") &&
      options?.method === "PATCH"
    ) {
      // UPDATE
      const body = options?.body ? JSON.parse(options.body as string) : {};
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: body.name, completed: body.completed }),
      } as Response);
    }
    if (
      url?.toString().includes("/api/tasks/1") &&
      options?.method === "DELETE"
    ) {
      // DELETE
      return Promise.resolve({ ok: true } as Response);
    }
    return Promise.resolve({ ok: false } as Response);
  }) as jest.Mock;
  consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  (global.fetch as jest.Mock).mockReset();
  consoleErrorSpy.mockRestore();
});

test("shows 'no data' message when backend returns empty array", async () => {
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    } as Response)
  );
  render(<App />);
  expect(await screen.findByText("No tasks found")).toBeInTheDocument();
});

test("renders tasks and filters by name", async () => {
  render(<App />);
  expect(await screen.findByText("Task 1")).toBeInTheDocument();
  expect(screen.getByText("Task 2")).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText(/search tasks/i), {
    target: { value: "Task 1" },
  });
  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
});

test("deletes a task from the main grid", async () => {
  render(<App />);

  expect(await screen.findByText("Task 1")).toBeInTheDocument();
  expect(screen.getByText("Task 2")).toBeInTheDocument();

  const deleteButtons = screen.getAllByRole("button", {
    name: /delete/i,
  });
  fireEvent.click(deleteButtons[0]);

  await screen.findByText("Task 2"); // Espera a que la UI se actualice
  await waitFor(() => {
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  });

});

test("creates a new task via modal with full flow", async () => {
  render(<App />);

  const openModalButton = screen.getByRole("button", { name: /^create task$/i });
  fireEvent.click(openModalButton);

  expect(await screen.findByRole("heading", { name: /create task/i, level: 2 })).toBeInTheDocument();

  const input = await screen.findByPlaceholderText(/task name/i);
  fireEvent.change(input, { target: { value: "New Task" } });

  const createButton = screen.getByRole("button", { name: /^create$/i });
  fireEvent.click(createButton);

  await waitFor(() => {
    expect(screen.queryByRole("heading", { name: /create task/i, level: 2 })).not.toBeInTheDocument();
  });

  expect(await screen.findByText("New Task")).toBeInTheDocument();
});

test("edits a task via modal with full flow", async () => {
  render(<App />);

  expect(await screen.findByText("Task 1")).toBeInTheDocument();

  const editButtons = screen.getAllByRole("button", { name: /edit/i });
  fireEvent.click(editButtons[0]);

  expect(await screen.findByRole("heading", { name: /edit task/i, level: 2 })).toBeInTheDocument();

  const input = await screen.findByPlaceholderText(/task name/i);
  fireEvent.change(input, { target: { value: "Task 1 edited" } });

  const completedCheckbox = screen.getByRole("checkbox", { name: /completed/i });
  fireEvent.click(completedCheckbox);

  const saveButton = screen.getByRole("button", { name: /save|update/i });
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(screen.queryByRole("heading", { name: /edit task/i, level: 2 })).not.toBeInTheDocument();
  });

  expect(await screen.findByText("Task 1 edited")).toBeInTheDocument();
  const completedCells = screen.getAllByText(/completed/i);
  expect(completedCells).toHaveLength(2);
});