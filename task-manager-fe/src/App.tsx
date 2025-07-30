import { useEffect, useState, useRef } from "react";
import "./App.css";
import type { Task } from "./types";
import Modal from "./components/Modal";
import { createTask, deleteTask, fetchTasks, updateTask } from "./utils";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      const data = await fetchTasks(setError);
      setTasks(data);
      setLoading(false);
    };
    loadTasks();
  }, []);

  useEffect(() => {
    if (!loading && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [loading]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [searchTerm, tasks]);

  return (
    <div className="app-container">
      <header className="App-header">
        <h1>Task Manager</h1>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          ref={searchInputRef}
          autoComplete="off"
        />
        <button
          onClick={() => {
            setEditTask(null);
            setModalOpen(true);
          }}
        >
          Create Task
        </button>
      </header>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <tr key={task.id} className={task.completed ? "completed" : ""}>
                  <td>{task.name}</td>
                  <td>{task.completed ? "Completed" : "Pending"}</td>
                  <td>
                    <button
                      onClick={() => deleteTask(task.id, setTasks, setError)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setEditTask(task);
                        setModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No tasks found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {error && <div className="error-message">{error}</div>}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={async (name, completed) => {
          if (editTask) {
            // PATCH request to update
            await updateTask(editTask.id, name, completed, setTasks, setError);
          } else {
            // POST request to create
            await createTask(name, setTasks, setError);
          }
          setModalOpen(false);
        }}
        initialName={editTask?.name}
        initialCompleted={editTask?.completed}
        isEdit={!!editTask}
      />
    </div>
  );
}

export default App;
