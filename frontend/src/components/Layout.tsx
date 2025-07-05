import React from "react";
import { NavLink } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="bg-blue-600 p-4 text-white flex gap-4">
        <NavLink
          to="/tasks"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Tasks
        </NavLink>
        <NavLink
          to="/notes"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Notes
        </NavLink>
      </header>
      <main className="p-4 max-w-3xl mx-auto">{children}</main>
    </div>
  );
}
