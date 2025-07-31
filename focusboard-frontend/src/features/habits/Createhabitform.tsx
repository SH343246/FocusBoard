import { use, useState } from "react";
import { createHabit } from "./Habitservice";
import { useMutation, useQueryClient } from "@tanstack/react-query";





export default function CreateHabitForm() {
  const [name, setName] = useState(""); 
  const [frequency, setFrequency] = useState("");
  const queryClient = useQueryClient();
  const [error1, setError] = useState("");
  const [description, setDescription] = useState("");

const{mutate, isPending, isError, error, isSuccess} = useMutation({
  mutationFn: createHabit,
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ["habits"]}); 
  },
});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name1 = name.trim();
    const frequency1 = frequency.trim();
    const description1 = description.trim();

  if (!name1 || !frequency1) {
    setError("Name and frequency are required.");
    return;                       
  }

    mutate({ name: name1, frequency: frequency1, description: description1 }); 
    setName("");
    setFrequency("");
    setDescription("");
    setError("") 
  };



  return (
<form
  onSubmit={handleSubmit}
  /* ⭑ smaller outer padding & gap */
  className="backdrop-blur-md bg-white/50 dark:bg-white/10 rounded-2xl border border-white/40 shadow-sm p-2 space-y-2"
>
  {error1 && <p className="text-xs text-red-500">{error1}</p>}

  {/* Habit Name */}
  <div className="space-y-0.5">          {/* ⭑ cut row gap */}
    <label className="block text-xs font-medium">Habit Name</label>  {/* ⭑ text-xs */}
    <input
      type="text"
      className="w-full px-2 py-1 text-xs rounded-md bg-white/80 dark:bg-zinc-900 placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>

  {/* Frequency */}
  <div className="space-y-0.5">
    <label className="block text-xs font-medium">Frequency</label>
    <input
      type="text"
      className="w-full px-2 py-1 text-xs rounded-md bg-white/80 dark:bg-zinc-900 placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={frequency}
      onChange={(e) => setFrequency(e.target.value)}
    />
  </div>

  {/* Description */}
  <div className="space-y-0.5">
    <label className="block text-xs font-medium">Description</label>
    <input
      type="text"
      className="w-full px-2 py-1 text-xs rounded-md bg-white/80 dark:bg-zinc-900 placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </div>

  {/* ⭑ shorter button, smaller top‑margin */}
  <button
    type="submit"
    className="mt-2 bg-blue-500 text-black px-3 py-1 text-xs rounded-md hover:bg-blue-600 transition"
  >
    Add habit
  </button>

  {isPending && <p className="text-xs text-blue-500">Submitting…</p>}
  {isError   && <p className="text-xs text-red-500">Error: {(error as Error).message}</p>}
  {isSuccess && <p className="text-xs text-green-500">Habit added!</p>}
</form>

  );
}

