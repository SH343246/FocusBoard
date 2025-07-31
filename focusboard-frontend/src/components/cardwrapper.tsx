import {
  Card as ShadCard,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

import type { LucideIcon } from "lucide-react";

export function CardWrapper({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <ShadCard
      className="w-full space-y-2 backdrop-blur-xl bg-black/10
                 border border-black/20 text-black rounded-xl
                 transition duration-300 ease-in-out shadow-md
                 hover:shadow-xl hover:shadow-black/40"
    >
      <CardHeader className="flex items-center gap-2 text-sm font-semibold">
        {Icon && <Icon className="w-4 h-4 text-brand" />}
        {title}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </ShadCard>
  );
}