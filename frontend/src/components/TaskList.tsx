import { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import type { Task } from "../types";

type Props = {
  tasks: Task[];
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, title: string, completed?: boolean) => Promise<void>;
};

export default function TaskList({ tasks, onDelete, onUpdate }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex justify-between items-center border p-2 rounded"
        >
          {editingId === task._id ? (
            <EditTaskForm
              id={task._id}
              currentTitle={task.title}
              onDone={() => setEditingId(null)}
              onUpdate={(id, newTitle) =>
                onUpdate(id, newTitle, task.completed)
              }
            />
          ) : (
            <>
              <div className="flex items-center gap-2 flex-grow">
                <input
                  type="checkbox"
                  checked={task.completed ?? false}
                  onChange={() =>
                    onUpdate(task._id, task.title, !task.completed)
                  }
                />
                <span
                  className={`${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </span>
                {task.dueDate && !isNaN(new Date(task.dueDate).getTime()) && (
                  <span className="text-sm text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingId(task._id)}
                  className="text-yellow-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
