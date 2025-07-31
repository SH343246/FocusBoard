import {useQuery,useMutation,useQueryClient,
} from "@tanstack/react-query";
import api from "@/api/axiosinstance";
import type { UserWidget } from "../habits/types";

export const WIDGETS_KEY = ["userwidgets"] as const;

export function Usewidgets() {
  return useQuery<UserWidget[]>({
    queryKey: WIDGETS_KEY,          
    queryFn: async () => (await api.get("/widgets/me")).data,
    staleTime: 1000,
  });
}

export function ToggleWidget() {
  const qc = useQueryClient();
  return useMutation({
   mutationFn: ({ id, enabled }: { id: number; enabled: boolean }) =>
     api.put(`/widgets/${id}`, { enabled }), 
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: WIDGETS_KEY });
    },
  });
}

export function UpdateStyle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, style }: { id: number; style: string }) =>
     api.put(`/widgets/${id}`, { style }),       
    onSuccess: () => qc.invalidateQueries({ queryKey: WIDGETS_KEY }),
  });
}
