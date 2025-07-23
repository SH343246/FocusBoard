import { useMutation, useQueryClient} from "@tanstack/react-query";
import api from "../../api/axiosinstance";
import { TODOS_KEY } from "./Usetodo";   
import type { Todos } from "../habits/types";

export function Deletetodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; }) =>
      api.delete(`/todos/${data.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
    }
  })
}
