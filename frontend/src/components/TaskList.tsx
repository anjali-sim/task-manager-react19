import { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import type { Task, Priority } from "../types";

type Props = {
  tasks: Task[];
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, title: string, completed?: boolean) => Promise<void>;
};

const PRIORITY_ORDER: Record<Priority, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
};

const PRIORITY_BADGE: Record<Priority, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

export default function TaskList({ tasks, onDelete, onUpdate }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const sortedTasks = [...tasks].sort((a, b) => {
    const aPriority = PRIORITY_ORDER[a.priority ?? "Medium"];
    const bPriority = PRIORITY_ORDER[b.priority ?? "Medium"];
    return aPriority - bPriority;
  });

  return (
    <ul className="space-y-2">
      {sortedTasks.map((task) => {
        const priority: Priority = task.priority ?? "Medium";
        return (
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
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PRIORITY_BADGE[priority]}`}
                  >
                    {priority}
                  </span>
                  <span
                    className={`${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </span>
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
        );
      })}
    </ul>
  );
}
