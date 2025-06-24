import { useHabits } from "./usehabits.ts";

export default function HabitList() {
  const { data, isLoading, error } = useHabits();

  if (isLoading) return <p>Loading habits...</p>;
  if (error) return <p>Failed to load habits.</p>;

  return (
    <ul className="space-y-2">
      {data?.map((habit) => (
        <li
          key={habit.id}
          className="bg-white shadow rounded p-4 border border-gray-200"
        >
          <h3 className="text-lg font-semibold">{habit.name}</h3>
          <p className="text-gray-600">Frequency: {habit.frequency}</p>
        </li>
      ))}
    </ul>
  );
}
