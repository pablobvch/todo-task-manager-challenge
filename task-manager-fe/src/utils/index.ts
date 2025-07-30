import type { Task } from "../types";

export const fetchTasks = async (
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const response = await fetch("http://localhost:8000/api/tasks");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data as Task[];
  } catch (error) {
    setError("Could not connect to the server.");
    console.error("Error fetching images:", error);
    return [];
  }
};

export const deleteTask = async (
  id: number,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  } catch (error) {
    setError("Error deleting task.");
    console.error("Error deleting task:", error);
  }
};

export const createTask = async (
  name: Task["name"],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const response = await fetch("http://localhost:8000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    const newTask = await response.json();
    setTasks((prevTasks) => [...prevTasks, newTask]);
  } catch (error) {
    setError("Error creating task.");
    console.error("Error creating task:", error);
  }
};

export const updateTask = async (
  id: number,
  name: string,
  completed: boolean,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {

    const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, completed }),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, name, completed } : task))
    );
  } catch (error) {
    setError("Error updating task.");
    console.error("Error updating task:", error);
  }
};