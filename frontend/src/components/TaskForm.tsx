import { useActionState } from "react";

type Props = {
  onAddTask: (formData: FormData) => Promise<void>;
  ref: React.RefObject<HTMLInputElement | null>;
};

type FormState = {
  message: string;
  isError: boolean;
};

export default function TaskForm({ onAddTask, ref }: Props) {
  const createTaskAction = async (
    _: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const title = (formData.get("title")?.toString() ?? "").trim();
    if (!title) return { message: "Title is required", isError: true };
    if (title.length < 3)
      return {
        message: "Title must be at least 3 characters",
        isError: true,
      };
    formData.set("title", title);
    await onAddTask(formData);
    return { message: "Task created successfully!", isError: false };
  };

  const [state, formAction, pending] = useActionState(createTaskAction, {
    message: "",
    isError: false,
  });

  return (
    <form action={formAction} className="flex gap-2 mb-4 flex-wrap">
      <input
        ref={ref}
        name="title"
        className="border p-2 flex-grow"
        placeholder="New task"
      />
      <select
        name="priority"
        defaultValue="Medium"
        className="border p-2 rounded"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button
        type="submit"
        disabled={pending}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {pending ? "Adding..." : "Add"}
      </button>
      {state.message && (
        <p className={state.isError ? "text-red-600" : "text-green-600"}>
          {state.message}
        </p>
      )}
    </form>
  );
}
