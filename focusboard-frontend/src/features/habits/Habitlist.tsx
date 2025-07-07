import { useHabits } from "./Usehabits.ts";
import { deleteHabit, updateHabit} from "./Habitservice.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from 'react';
import type { Filter } from './Changetabs'; 
import axios from "axios";
import type { Habit } from "./types.ts";

interface Props {
  filter?: Filter;                           
}

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


export default function HabitList({ filter}: Props) {
  const { data, isLoading, error } = useHabits();
  const { mutate: deleteHabitMutate,   isPending } = useDeleteHabit();
  const { mutate: updateHabitMutate } = useUpdateHabit();

  if (isLoading) return <p>Loading habits…</p>;
  if (error)     return <p>Failed to load habits.</p>;


  const filteredHabits = data?.filter(habit => {
  if (filter === 'completed') return habit.completed === true;
  if (filter === 'active')    return habit.completed === false;
  return true; 
  });


  return (
    <div className="max-w-screen-md container mx-auto px-4 font-sans text-gray-800 leading-relaxed">

  <ul className="space-y-2">
    {data?.length === 0 && (
      <p className="text-gray-500 italic text-base leading-snug">No habits yet. Add your first habit!</p>
    )}
    
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

    <ul className="space-y-2">
      {filteredHabits?.length === 0 && (
        <p className="text-gray-500 italic text-base leading-snug">No habits</p>)}
      {filteredHabits?.map((habit) => (
        <li
          key={habit.id}
          className="bg-white shadow rounded p-4 border border-gray-200 hover:shadow-md transition"
        >
          <input
            type="checkbox"
            checked={habit.completed}
            onChange={() =>
              updateHabitMutate({ ...habit, completed: !habit.completed  })}
            />
          <h3 className="text-xl md:text-xl font-semibold tracking-tight text-gray-900">{habit.name}</h3>
          <p className="mt-1 text-sm text-gray-600 italic"> Description: {habit.description}</p>
          <p className="mt-1 text-sm text-gray-600">Frequency: {habit.frequency}</p>
          <p className="mt-1 text-sm text-gray-600">start_date: {habit.start_date}</p>

          
          <button
      onClick={() => {if(confirm("Are you sure?")) deleteHabitMutate(habit.id);}}
      disabled={isPending}
      className={`mt-4 bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition ${
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
    className="ml-2 mt-4 bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
>
  Update</button>

        </li>
      ))}
      
    </ul>
  );
  </ul>
  </ul>
</div>
  );
}
