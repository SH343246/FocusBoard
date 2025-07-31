import { useState } from "react";
import type { Habit } from "@/features/habits/types";
import { FiTrash, FiEdit, FiCheck, FiCheckCircle } from "react-icons/fi";

export function HabitCard({habit,onDelete,onUpdate,ToggleComplete,
}: {
  habit: Habit;
  onDelete: () => void;
  onUpdate: (updated: Habit) => void;
  ToggleComplete: () => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(habit.name);
  const [frequency, setFrequency] = useState(habit.frequency);
  const handleSubmit = () => {
    onUpdate({ ...habit, name, frequency });
    setEditMode(false);
  };

  return (
    <div
      className={`backdrop-blur-md rounded-2xl border shadow-sm p-3 space-y-3
        ${habit.completed ? "bg-green-100 dark:bg-green-800 opacity-70" : "bg-white/50 dark:bg-white/10"}
        border-white/40`}
    >
      {editMode ? (
        <>
     <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-1 border rounded text-sm"
            placeholder="Name"
          />
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full p-1 border rounded text-sm"
            placeholder="Frequency"
          />
        </>
      ) : (
        <>
          <h4 className={`font-semibold capitalize ${habit.completed ? "line-through" : ""}`}>
            {habit.name}
          </h4>
          <p className="text-xs text-muted-foreground">
            {habit.description || "—"}
          </p>
          <p className="text-xs">Freq: {habit.frequency}</p>
          <p className="text-xs">
            Status: {habit.completed ? "Completed" : "Active"}
          </p>
          <p className="text-xs">
            Start:&nbsp;
            {habit.start_date
              ? new Date(habit.start_date).toLocaleDateString()
              : "—"}
          </p>
        </>
      )}

     <div className="flex gap-2 pt-2 justify-end">
  <button
    onClick={ToggleComplete}
    className="p-2 text-green-500 hover:text-black hover:bg-green-500 rounded-full transition-all"
    title={habit.completed ? "Mark as Incomplete" : "Mark as Complete"}
  >
    <FiCheckCircle size={18} />
  </button>

  <button
    onClick={onDelete}
    className="p-2 text-red-500 hover:text-black hover:bg-red-500 rounded-full transition-all"
    title="Delete"
  >
    <FiTrash size={15} />
  </button>

  {editMode ? (
    <button
      onClick={handleSubmit}
      className="p-2 text-green-600 hover:text-black hover:bg-green-600 rounded-full transition-all"
      title="Save"
    >
      <FiCheck size={15} />
    </button>
  ) : (
    <button
      onClick={() => setEditMode(true)}
      className="p-2 text-blue-500 hover:text-black hover:bg-blue-500 rounded-full transition-all"
      title="Edit"
    >
      <FiEdit size={15} />
    </button>
  )}
</div>

    </div>
  );
}
