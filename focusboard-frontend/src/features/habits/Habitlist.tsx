import { HabitCard } from "../../components/habitwrapper";
import { useHabits } from "./Usehabits";
import { deleteHabit, updateHabit, CompleteHabit } from "./Habitservice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Filter } from "./Changetabs";

export default function HabitList({ filter }: { filter: Filter }) {
  const { data: habits = [], isLoading } = useHabits();
  const queryClient = useQueryClient();

  const deleteHabitMutation = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
  });

  const updateHabitMutation = useMutation({
    mutationFn: updateHabit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
  });

  const toggleHabitMutation = useMutation({
    mutationFn: CompleteHabit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
  });

  const filtered = habits.filter((habit) => {
    if (filter === "completed") return habit.completed;
    if (filter === "active") return !habit.completed;
    return true;
  });

  if (isLoading) {
    return <p>Loading habits...</p>;
  }

  if (!filtered.length) {
    return <p className="text-black-500 italic">No habits found.</p>;
  }

  return (
    <>
      {filtered.map((h) => (
        <HabitCard
          key={h.id}
          habit={h}
          onDelete={() => deleteHabitMutation.mutate(h.id)}
          onUpdate={(updated) => updateHabitMutation.mutate(updated)}
          ToggleComplete={() => toggleHabitMutation.mutate(h)}
        />
      ))}
    </>
  );
}
