import { useActionState } from "react";

interface FormFields {
  name: string;
  email: string;
  password: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

interface FormState {
  errors: ValidationErrors;
  success: boolean;
  values: FormFields;
}

interface Props {
  onSubmit?: (data: FormFields) => Promise<void>;
}

function validate(fields: FormFields): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!fields.name.trim()) {
    errors.name = "Name is required.";
  } else if (fields.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!fields.password) {
    errors.password = "Password is required.";
  } else if (fields.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }
  if (!fields.message.trim()) {
    errors.message = "Message is required.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
}

const initialState: FormState = {
  errors: {},
  success: false,
  values: { name: "", email: "", password: "", message: "" },
};

export default function ContactForm({ onSubmit }: Props) {
  const formAction = async (
    _: FormState,
    formData: FormData,
  ): Promise<FormState> => {
    const fields: FormFields = {
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
      message: formData.get("message")?.toString() ?? "",
    };
    const errors = validate(fields);
    if (Object.keys(errors).length > 0) {
      return { errors, success: false, values: fields };
    }
    if (onSubmit) {
      await onSubmit(fields);
    }
    return {
      errors: {},
      success: true,
      values: { name: "", email: "", password: "", message: "" },
    };
  };

  const [state, action, pending] = useActionState(formAction, initialState);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Contact Us</h2>
        <p className="text-gray-500 text-sm mb-6">
          Fill in the details below and we'll get back to you.
        </p>

        {state.success && (
          <div className="mb-5 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
            ✅ Your message has been sent successfully!
          </div>
        )}

        <form action={action} noValidate className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={state.values.name}
              placeholder="Jane Doe"
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 transition ${
                state.errors.name
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {state.errors.name && (
              <p className="mt-1 text-xs text-red-500">{state.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={state.values.email}
              placeholder="jane@example.com"
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 transition ${
                state.errors.email
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {state.errors.email && (
              <p className="mt-1 text-xs text-red-500">{state.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Min. 8 characters"
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 transition ${
                state.errors.password
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {state.errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {state.errors.password}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              defaultValue={state.values.message}
              placeholder="Write your message here..."
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 transition resize-none ${
                state.errors.message
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {state.errors.message && (
              <p className="mt-1 text-xs text-red-500">
                {state.errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium py-2 rounded-lg transition text-sm"
          >
            {pending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
