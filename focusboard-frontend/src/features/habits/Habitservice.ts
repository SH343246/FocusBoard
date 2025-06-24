import client from "../../api/client"; 

export interface Habit {
  id: number;
  name: string;
  frequency: string;
  description: string;
  start_date: string;
}

export const fetchHabits = async (): Promise<Habit[]> => {
  const response = await client.get("/habits");
  return response.data;
};
