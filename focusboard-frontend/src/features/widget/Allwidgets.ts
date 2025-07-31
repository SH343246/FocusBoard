import { useQuery } from "@tanstack/react-query";
import api from "../../api/axiosinstance";

export function Showallwidgets() {
  return useQuery({
    queryKey: ["all-widgets"],
    queryFn: async () => {
      const res = await api.get("/widgets");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, 
  });
}
