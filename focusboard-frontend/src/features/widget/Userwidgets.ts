import { useQuery } from "@tanstack/react-query";
import api from "../../api/axiosinstance";
import { Usewidgets } from "./Usewidgets";
export const useWidgets = Usewidgets;

export function UserWidgets() {
  return useQuery({
    queryKey: ["userwidgets"],
    queryFn: async () => {
      const res = await api.get("/widgets/me");
      return res.data;
    },
    staleTime: 60 * 1000,
  });
}
