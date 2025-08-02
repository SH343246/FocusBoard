import { useMutation, useQueryClient} from "@tanstack/react-query";
import api from "../../api/axiosinstance";
import { TODOS_KEY } from "./Usetodo";   
import type { Todos } from "../habits/types";

export function Createtodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; description?: string }) =>
      api.post("/todos", data).then(res => res.data as Todos),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
    }
  });
}
