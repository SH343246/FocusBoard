import { useQuery } from "@tanstack/react-query";
import { fetchHabits } from "./Habitservice";

export const useHabits = () => {
  return useQuery({
    queryKey: ["habits"],
    queryFn: fetchHabits,
  });
};
