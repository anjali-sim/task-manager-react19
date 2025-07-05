import { useFormStatus } from "react-dom";

type Props = {
  id: string;
  currentTitle: string;
  onDone: () => void;
  onUpdate: (id: string, title: string) => Promise<void>;
};

export default function EditTaskForm({
  id,
  currentTitle,
  onDone,
  onUpdate,
}: Props) {
  const { pending } = useFormStatus();

  return (
    <form
      action={async (formData: FormData) => {
        const title = formData.get("title")?.toString();
        if (!title) return;
        await onUpdate(id, title);
        onDone();
      }}
      className="flex gap-2 w-full"
    >
      <input type="hidden" name="id" value={id} />
      <input
        name="title"
        defaultValue={currentTitle}
        className="border p-2 flex-grow"
      />
      <button
        type="submit"
        disabled={pending}
        className="bg-green-500 text-white px-3 rounded"
      >
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
