import { useQuery } from "@tanstack/react-query";
import api from "../../api/axiosinstance";
export const TODOS_KEY = ['todos'];


export function useTodos  () {
 return useQuery({
  queryKey: TODOS_KEY,
  queryFn: async () => {
const response = await api.get("http://localhost:8000/todos");
    return response.data;
  }
 });
}
