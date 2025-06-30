import { use, useState } from "react";
import { createHabit } from "./Habitservice";
import { useMutation, useQueryClient } from "@tanstack/react-query";





export default function CreateHabitForm() {
  const [name, setName] = useState(""); 
  const [frequency, setFrequency] = useState("");
  const queryClient = useQueryClient();
  const [error1, setError] = useState("");

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

  if (!name1 || !frequency1) {
    setError("Name and frequency are required.");
    return;                       
  }

    mutate({ name: name1, frequency: frequency1 }); 
    setName("");
    setFrequency("");
    setError("") 
  };



  return (
    <form onSubmit={(handleSubmit)}>

      {error1 && <p className="text-red-500">{error1}</p>}


      <div>
        <label className="block font-medium">Habit Name/s</label>
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className="block font-medium">Frequency</label>
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)} />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Add habit
      </button>

{isPending && <p className="text-blue-500">Submitting...</p>}
{isError && <p className="text-red-500">Error: {(error as Error).message}</p>}
{isSuccess && <p className="text-green-500">Habit added!</p>}



    </form>
  );
}

