// UpdateWidgetOrder.ts (NEW)
import { useMutation } from "@tanstack/react-query";
import api from "../../api/axiosinstance";

type WidgetOrderUpdate = {
  id: number;
  position: number;
};

export function useUpdateWidgetOrder() {
  return useMutation({
    mutationFn: (data: WidgetOrderUpdate[]) =>
      api.patch("/widgets/order", data),
  });
}
