import { useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "../../api/axiosinstance";
import { TODOS_KEY } from "./Usetodo";   
import type { Todos } from "../habits/types";

export function Updatetodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number; title?: string; description?: string; done?: boolean }) =>
      axios.put(`/todos/${data.id}`, data).then((res) => res.data as Todos),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
    },
  });
}
