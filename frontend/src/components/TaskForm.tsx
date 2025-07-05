import { useActionState } from "react";

type Props = {
  onAddTask: (formData: FormData) => Promise<void>;
  ref: React.RefObject<HTMLInputElement | null>;
};

export default function TaskForm({ onAddTask, ref }: Props) {
  const createTaskAction = async (
    _: string,
    formData: FormData
  ): Promise<string> => {
    const title = formData.get("title")?.toString();
    if (!title) return "Title is required";
    await onAddTask(formData);
    return "Task created successfully!";
  };

  const [message, formAction, pending] = useActionState(createTaskAction, "");

  return (
    <form action={formAction} className="flex gap-2 mb-4">
      <input
        ref={ref}
        name="title"
        className="border p-2 w-full"
        placeholder="New task"
        required
      />
      <button
        type="submit"
        disabled={pending}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {pending ? "Adding..." : "Add"}
      </button>
      {message && <p className="text-green-600">{message}</p>}
    </form>
  );
}
