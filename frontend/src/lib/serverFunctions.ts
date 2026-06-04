"use server";

import type { Task } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/tasks`);
  return res.json();
}

export async function createTask(formData: FormData): Promise<Task> {
  const title = formData.get("title")?.toString();
  const dueDate = formData.get("dueDate")?.toString() || undefined;
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify({ title, dueDate }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export async function updateTask(
  id: string,
  title: string,
  completed?: boolean
) {
  await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, completed }),
    headers: { "Content-Type": "application/json" },
  });
}

export async function deleteTask(id: string): Promise<void> {
  await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
}
