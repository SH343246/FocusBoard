import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axiosinstance";

export function Updatewidgets() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, enabled }: { id: number; enabled: boolean }) =>
     api.put(`/widgets/${id}`, { enabled }),   
    onSuccess: () => qc.invalidateQueries({ queryKey: ["userwidgets" ]}),
  });
}
