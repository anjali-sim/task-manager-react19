import {
  useState,
  useTransition,
  useOptimistic,
  useEffect,
  useRef,
} from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {
  fetchTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../lib/serverFunctions";
import type { Task } from "../types";

export const prerender = true;

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // const LazyGreeting = lazy(() => import("../components/GreetingComponent"));

  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    (prevTasks: Task[], newTask: Task) => [...prevTasks, newTask]
  );

  useEffect(() => {
    startTransition(async () => {
      const data = await fetchTasks();
      setTasks(data);
    });
  }, []);

  const handleAddTask = async (formData: FormData) => {
    const newTask = await createTask(formData);
    setTasks((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const handleUpdateTask = async (
    id: string,
    title: string,
    completed?: boolean
  ) => {
    await updateTask(id, title, completed);
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id
          ? { ...task, title, completed: completed ?? task.completed }
          : task
      )
    );
  };

  const pageMetadata = {
    title: "Task Manager App - From React 19 Metadata",
    description:
      "Learn how to manage document metadata with React 19 natively.",
  };

  return (
    <main className="max-w-xl mx-auto py-10">
      <article>
        <title>{pageMetadata.title}</title>
        <meta name="description" content={pageMetadata.description} />
      </article>
      {/* <Suspense fallback={<p className="text-gray-400">Loading greeting...</p>}>
        <LazyGreeting />
      </Suspense> */}
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      {isPending && (
        <div className="text-blue-500 mb-4">Loading tasks, please wait...</div>
      )}

      <TaskForm
        onAddTask={async (formData) => {
          const fakeTask: Task = {
            _id: Date.now().toString(),
            title: formData.get("title")?.toString() ?? "",
            completed: false,
          };
          addOptimisticTask(fakeTask);
          await handleAddTask(formData);
        }}
        ref={inputRef}
      />

      <TaskList
        tasks={optimisticTasks}
        onDelete={handleDeleteTask}
        onUpdate={handleUpdateTask}
      />
    </main>
  );
}
