import { useState } from "react";

export default function CreateHabitForm() {
  const [name, setName] = useState(""); 
  const [frequency, setFrequency] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, frequency }); 
  };



  return (
    <form onSubmit={(handleSubmit)}>
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
    </form>
  );
}

