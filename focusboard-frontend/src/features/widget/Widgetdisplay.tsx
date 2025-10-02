// src/features/widget/Widgetdisplay.tsx
import { useWidgets } from "./Userwidgets";
import { WidgetRegistryLC } from "./WidgetRegistry";

type WireUserWidget = {
  id: number;
  enabled: boolean;
type: string;};

export default function WidgetRenderer() {
  const { data = [], isLoading } = useWidgets();
  if (isLoading) return <p>Loading dashboard widgets...</p>;

  const list: WireUserWidget[] = Array.isArray(data) ? (data as WireUserWidget[]) : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {list.map((uw) => {
        if (!uw?.enabled ||!uw?.type) return null;

        const key = uw.type.trim().toLowerCase();
        const Comp = WidgetRegistryLC[key];
if (!Comp) return null; 
        return Comp ? <Comp key={uw.id} /> : null;
      })}
    </div>
  );
}
