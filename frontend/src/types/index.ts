export type Priority = "High" | "Medium" | "Low";

export type Task = {
  _id: string;
  title: string;
  completed?: boolean;
  priority?: Priority;
};
