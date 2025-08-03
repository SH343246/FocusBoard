import { useQuery } from "@tanstack/react-query";
import api from "../../api/axiosinstance";
export const TODOS_KEY = ['todos'];
import.meta.env.VITE_API_BASE_URL


export function useTodos  () {
 return useQuery({
  queryKey: TODOS_KEY,
  queryFn: async () => {
  const response = await api.get("/todos/");
    return response.data;
  }
 });
}
