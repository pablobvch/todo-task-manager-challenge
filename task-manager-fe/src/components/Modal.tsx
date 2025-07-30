import { useEffect, useState } from "react";
import type { Task } from "../types";

function Modal({
  isOpen,
  onClose,
  onSubmit,
  initialName = "",
  initialCompleted = false,
  isEdit = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: Task["name"], completed: Task["completed"]) => void;
  initialName?: Task["name"];
  initialCompleted?: Task["completed"];
  isEdit?: boolean;
}) {
  const [name, setName] = useState(initialName);
  const [completed, setCompleted] = useState(initialCompleted);

  useEffect(() => {
    setName(initialName);
    setCompleted(initialCompleted);
  }, [initialName, initialCompleted, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{isEdit ? "Edit Task" : "Create Task"}</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit(name, completed);
          }}
        >
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Task name"
            required
            autoFocus
          />
          {isEdit && (
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={e => setCompleted(e.target.checked)}
              />
              Completed
            </label>
          )}
          <div style={{ marginTop: "1rem" }}>
            <button type="submit">{isEdit ? "Update" : "Create"}</button>
            <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;