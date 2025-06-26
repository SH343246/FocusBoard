import client from "../../api/client"; 
import type { Habit } from "./types";



export const fetchHabits = async (): Promise<Habit[]> => {
  const response = await client.get("/habits");
  return response.data;
};

export const createHabit = async (habit : {
  name: string;
  frequency: string;

}): Promise<Habit> => {
  const response = await client.post("/habits", habit);
  return response.data;
}; 

export const deleteHabit = async (id: number): Promise<void> => {
   await client.delete(`/habits/${id}`);
  
};

export const updateHabit = async (habit : Habit): Promise<Habit> => {
  const {data} = await client.put(`/habits/${habit.id}`, habit);
  return data
};