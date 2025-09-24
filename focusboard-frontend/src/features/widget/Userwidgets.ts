import { useQuery } from "@tanstack/react-query";
import api from "../../api/axiosinstance";

export function useWidgets() {
  return useQuery({
    queryKey: ["userwidgets"],
    queryFn: async () => {
      const res = await api.get("/widgets/me");
      const data = res.data;
      return Array.isArray(data) ? data : [];
    },
    staleTime: 60 * 1000,
  });
}
