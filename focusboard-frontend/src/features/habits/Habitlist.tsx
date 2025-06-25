import { useHabits } from "./Usehabits.ts";
import { deleteHabit, updateHabit} from "./Habitservice.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Habit } from "./types.ts";

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteHabit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
}

export const useUpdateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation<Habit, Error, Habit>({
    mutationFn: updateHabit,                           
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
};





export default function HabitList() {
  const { data, isLoading, error } = useHabits();
  const { mutate: deleteHabitMutate,   isPending } = useDeleteHabit();
  const { mutate: updateHabitMutate } = useUpdateHabit();

  if (isLoading) return <p>Loading habits…</p>;
  if (error)     return <p>Failed to load habits.</p>;





  return (

  <ul className="space-y-2">
    {data?.length === 0 && (
      <p className="text-gray-500 italic">No habits yet. Add your first habit!</p>
    )}

    <ul className="space-y-2">
      {data?.map((habit) => (
        <li
          key={habit.id}
          className="bg-white shadow rounded p-4 border border-gray-200"
        >
          <h3 className="text-lg font-semibold">{habit.name}</h3>
          <p className="text-gray-600">Frequency: {habit.frequency}</p>

          
          
          <button
      onClick={() => {if(confirm("Are you sure?")) deleteHabitMutate(habit.id);}}
      disabled={isPending}
      className={`mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
      > {isPending ? "Deleting..." : "Delete Habit"}</button>
      <button 
      onClick={() => {
      const freqInput = prompt('Enter new frequency:', String(habit.frequency));
      const nameInput = prompt('Enter new name:',       habit.name);

      const newFrequency = freqInput === null ? habit.frequency : freqInput.trim();
      const newName      = nameInput?.trim()  || habit.name;

         updateHabitMutate({
      ...habit,           
      name:      newName,
      frequency: newFrequency,
    });
  }}
>
  Update</button>

        </li>
      ))}
      
    </ul>
  );
  </ul>
  );
}
